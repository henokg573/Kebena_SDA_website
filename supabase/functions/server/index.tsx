import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}));
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
);

// Initialize storage buckets
async function initializeStorage() {
  try {
    const bucketName = 'make-428cf7c5-church-content';
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 50 * 1024 * 1024 // 50MB limit
      });
      console.log('Storage bucket created:', bucketName);
    }
  } catch (error) {
    console.log('Storage initialization error:', error);
  }
}

// Helper function to get user from token
async function getUser(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) return null;
  
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) return null;
  
  return user;
}

// Auth routes
app.post('/make-server-428cf7c5/auth/signup', async (c) => {
  try {
    const { email, password, name, role = 'member' } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }
    
    // Store user profile in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email: data.user.email,
      name,
      role,
      created_at: new Date().toISOString(),
      course_progress: {}
    });
    
    return c.json({ user: data.user, message: 'User created successfully' });
  } catch (error) {
    console.log('Signup request error:', error);
    return c.json({ error: 'Invalid request data' }, 400);
  }
});

app.post('/make-server-428cf7c5/auth/profile', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const profile = await kv.get(`user:${user.id}`);
    return c.json({ profile });
  } catch (error) {
    console.log('Profile fetch error:', error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

// Content management routes
app.get('/make-server-428cf7c5/content/posts', async (c) => {
  try {
    const posts = await kv.getByPrefix('post:');
    return c.json({ posts: posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) });
  } catch (error) {
    console.log('Posts fetch error:', error);
    return c.json({ error: 'Failed to fetch posts' }, 500);
  }
});

app.post('/make-server-428cf7c5/content/posts', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const userProfile = await kv.get(`user:${user.id}`);
    if (!userProfile || userProfile.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const { title, description, content, type = 'sermon', image_url } = await c.req.json();
    
    const postId = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const post = {
      id: postId,
      title,
      description,
      content,
      type,
      image_url,
      author: userProfile.name,
      author_id: user.id,
      views: 0,
      likes: 0,
      comments: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`post:${postId}`, post);
    return c.json({ post, message: 'Post created successfully' });
  } catch (error) {
    console.log('Post creation error:', error);
    return c.json({ error: 'Failed to create post' }, 500);
  }
});

app.delete('/make-server-428cf7c5/content/posts/:postId', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const userProfile = await kv.get(`user:${user.id}`);
    if (!userProfile || userProfile.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const postId = c.req.param('postId');
    await kv.del(`post:${postId}`);
    
    return c.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log('Post deletion error:', error);
    return c.json({ error: 'Failed to delete post' }, 500);
  }
});

// Content interaction routes
app.post('/make-server-428cf7c5/content/posts/:postId/like', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const postId = c.req.param('postId');
    const post = await kv.get(`post:${postId}`);
    
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }
    
    // Get user's likes
    const userLikes = await kv.get(`user_likes:${user.id}`) || [];
    const hasLiked = userLikes.includes(postId);
    
    if (hasLiked) {
      // Unlike
      post.likes = Math.max((post.likes || 0) - 1, 0);
      const newLikes = userLikes.filter(id => id !== postId);
      await kv.set(`user_likes:${user.id}`, newLikes);
    } else {
      // Like
      post.likes = (post.likes || 0) + 1;
      userLikes.push(postId);
      await kv.set(`user_likes:${user.id}`, userLikes);
    }
    
    await kv.set(`post:${postId}`, post);
    return c.json({ likes: post.likes, hasLiked: !hasLiked });
  } catch (error) {
    console.log('Post like error:', error);
    return c.json({ error: 'Failed to toggle like' }, 500);
  }
});

app.post('/make-server-428cf7c5/content/posts/:postId/view', async (c) => {
  try {
    const postId = c.req.param('postId');
    const post = await kv.get(`post:${postId}`);
    
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }
    
    post.views = (post.views || 0) + 1;
    await kv.set(`post:${postId}`, post);
    
    return c.json({ views: post.views });
  } catch (error) {
    console.log('Post view error:', error);
    return c.json({ error: 'Failed to track view' }, 500);
  }
});

// Course management routes
app.get('/make-server-428cf7c5/courses', async (c) => {
  try {
    const courses = await kv.getByPrefix('course:');
    return c.json({ courses: courses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) });
  } catch (error) {
    console.log('Courses fetch error:', error);
    return c.json({ error: 'Failed to fetch courses' }, 500);
  }
});

app.post('/make-server-428cf7c5/courses', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const userProfile = await kv.get(`user:${user.id}`);
    if (!userProfile || userProfile.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const { title, description, lessons = [], instructor } = await c.req.json();
    
    const courseId = `course_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const course = {
      id: courseId,
      title,
      description,
      lessons: Array.isArray(lessons) ? lessons : [],
      instructor: instructor || userProfile.name,
      instructor_id: user.id,
      enrolled_users: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`course:${courseId}`, course);
    return c.json({ course, message: 'Course created successfully' });
  } catch (error) {
    console.log('Course creation error:', error);
    return c.json({ error: 'Failed to create course' }, 500);
  }
});

app.post('/make-server-428cf7c5/courses/:courseId/enroll', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const courseId = c.req.param('courseId');
    const course = await kv.get(`course:${courseId}`);
    
    if (!course) {
      return c.json({ error: 'Course not found' }, 404);
    }
    
    if (!course.enrolled_users.includes(user.id)) {
      course.enrolled_users.push(user.id);
      await kv.set(`course:${courseId}`, course);
    }
    
    // Initialize user progress
    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile) {
      if (!userProfile.course_progress) {
        userProfile.course_progress = {};
      }
      if (!userProfile.course_progress[courseId]) {
        userProfile.course_progress[courseId] = {
          enrolled_at: new Date().toISOString(),
          completed_lessons: [],
          progress_percentage: 0
        };
        await kv.set(`user:${user.id}`, userProfile);
      }
    }
    
    return c.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.log('Course enrollment error:', error);
    return c.json({ error: 'Failed to enroll in course' }, 500);
  }
});

app.post('/make-server-428cf7c5/courses/:courseId/progress', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const courseId = c.req.param('courseId');
    const { lessonId, completed } = await c.req.json();
    
    const userProfile = await kv.get(`user:${user.id}`);
    const course = await kv.get(`course:${courseId}`);
    
    if (!userProfile || !course) {
      return c.json({ error: 'User profile or course not found' }, 404);
    }
    
    if (!userProfile.course_progress) {
      userProfile.course_progress = {};
    }
    
    if (!userProfile.course_progress[courseId]) {
      userProfile.course_progress[courseId] = {
        enrolled_at: new Date().toISOString(),
        completed_lessons: [],
        progress_percentage: 0
      };
    }
    
    const progress = userProfile.course_progress[courseId];
    
    if (completed && !progress.completed_lessons.includes(lessonId)) {
      progress.completed_lessons.push(lessonId);
    } else if (!completed) {
      progress.completed_lessons = progress.completed_lessons.filter(id => id !== lessonId);
    }
    
    // Calculate progress percentage
    const totalLessons = course.lessons.length;
    progress.progress_percentage = totalLessons > 0 ? 
      Math.round((progress.completed_lessons.length / totalLessons) * 100) : 0;
    
    await kv.set(`user:${user.id}`, userProfile);
    
    return c.json({ progress });
  } catch (error) {
    console.log('Course progress update error:', error);
    return c.json({ error: 'Failed to update progress' }, 500);
  }
});

app.delete('/make-server-428cf7c5/courses/:courseId', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const userProfile = await kv.get(`user:${user.id}`);
    if (!userProfile || userProfile.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const courseId = c.req.param('courseId');
    await kv.del(`course:${courseId}`);
    
    return c.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.log('Course deletion error:', error);
    return c.json({ error: 'Failed to delete course' }, 500);
  }
});

// Podcast management routes
app.get('/make-server-428cf7c5/podcasts', async (c) => {
  try {
    const podcasts = await kv.getByPrefix('podcast:');
    return c.json({ podcasts: podcasts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) });
  } catch (error) {
    console.log('Podcasts fetch error:', error);
    return c.json({ error: 'Failed to fetch podcasts' }, 500);
  }
});

app.post('/make-server-428cf7c5/podcasts', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const userProfile = await kv.get(`user:${user.id}`);
    if (!userProfile || userProfile.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const { title, description, duration, audio_url } = await c.req.json();
    
    const podcastId = `podcast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const podcast = {
      id: podcastId,
      title,
      description,
      duration,
      audio_url,
      author: userProfile.name,
      author_id: user.id,
      plays: 0,
      likes: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`podcast:${podcastId}`, podcast);
    return c.json({ podcast, message: 'Podcast created successfully' });
  } catch (error) {
    console.log('Podcast creation error:', error);
    return c.json({ error: 'Failed to create podcast' }, 500);
  }
});

app.post('/make-server-428cf7c5/podcasts/:podcastId/play', async (c) => {
  try {
    const podcastId = c.req.param('podcastId');
    const podcast = await kv.get(`podcast:${podcastId}`);
    
    if (!podcast) {
      return c.json({ error: 'Podcast not found' }, 404);
    }
    
    podcast.plays = (podcast.plays || 0) + 1;
    await kv.set(`podcast:${podcastId}`, podcast);
    
    return c.json({ plays: podcast.plays });
  } catch (error) {
    console.log('Podcast play error:', error);
    return c.json({ error: 'Failed to track play' }, 500);
  }
});

app.delete('/make-server-428cf7c5/podcasts/:podcastId', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const userProfile = await kv.get(`user:${user.id}`);
    if (!userProfile || userProfile.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const podcastId = c.req.param('podcastId');
    await kv.del(`podcast:${podcastId}`);
    
    return c.json({ message: 'Podcast deleted successfully' });
  } catch (error) {
    console.log('Podcast deletion error:', error);
    return c.json({ error: 'Failed to delete podcast' }, 500);
  }
});

// Prayer request routes
app.get('/make-server-428cf7c5/prayer-requests', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const prayerRequests = await kv.getByPrefix('prayer:');
    return c.json({ 
      prayerRequests: prayerRequests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
    });
  } catch (error) {
    console.log('Prayer requests fetch error:', error);
    return c.json({ error: 'Failed to fetch prayer requests' }, 500);
  }
});

app.post('/make-server-428cf7c5/prayer-requests', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const { title, description, isAnonymous = false } = await c.req.json();
    const userProfile = await kv.get(`user:${user.id}`);
    
    const prayerId = `prayer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const prayerRequest = {
      id: prayerId,
      title,
      description,
      author: isAnonymous ? 'Anonymous' : userProfile?.name || 'Unknown',
      author_id: user.id,
      isAnonymous,
      prayers_count: 0,
      created_at: new Date().toISOString()
    };
    
    await kv.set(`prayer:${prayerId}`, prayerRequest);
    return c.json({ prayerRequest, message: 'Prayer request submitted successfully' });
  } catch (error) {
    console.log('Prayer request creation error:', error);
    return c.json({ error: 'Failed to create prayer request' }, 500);
  }
});

app.delete('/make-server-428cf7c5/prayer-requests/:prayerId', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const userProfile = await kv.get(`user:${user.id}`);
    if (!userProfile || userProfile.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const prayerId = c.req.param('prayerId');
    await kv.del(`prayer:${prayerId}`);
    
    return c.json({ message: 'Prayer request deleted successfully' });
  } catch (error) {
    console.log('Prayer request deletion error:', error);
    return c.json({ error: 'Failed to delete prayer request' }, 500);
  }
});

// File upload route
app.post('/make-server-428cf7c5/upload', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const userProfile = await kv.get(`user:${user.id}`);
    if (!userProfile || userProfile.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    return c.json({ message: 'File upload endpoint - ready for implementation' });
  } catch (error) {
    console.log('File upload error:', error);
    return c.json({ error: 'Failed to upload file' }, 500);
  }
});

// Stats endpoint for admin dashboard
app.get('/make-server-428cf7c5/stats', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const userProfile = await kv.get(`user:${user.id}`);
    if (!userProfile || userProfile.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }
    
    const [posts, podcasts, courses, users, prayers] = await Promise.all([
      kv.getByPrefix('post:'),
      kv.getByPrefix('podcast:'),
      kv.getByPrefix('course:'),
      kv.getByPrefix('user:'),
      kv.getByPrefix('prayer:')
    ]);
    
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
    const totalPlays = podcasts.reduce((sum, podcast) => sum + (podcast.plays || 0), 0);
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
    
    const stats = {
      totalPosts: posts.length,
      totalPodcasts: podcasts.length,
      totalCourses: courses.length,
      totalUsers: users.length,
      totalPrayerRequests: prayers.length,
      totalViews,
      totalPlays,
      totalLikes,
      recentActivity: {
        postsThisWeek: posts.filter(p => new Date(p.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
        podcastsThisWeek: podcasts.filter(p => new Date(p.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
        prayersThisWeek: prayers.filter(p => new Date(p.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
      }
    };
    
    return c.json({ stats });
  } catch (error) {
    console.log('Stats fetch error:', error);
    return c.json({ error: 'Failed to fetch stats' }, 500);
  }
});

// Health check
app.get('/make-server-428cf7c5/health', async (c) => {
  return c.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

// Initialize storage on startup
initializeStorage();

Deno.serve(app.fetch);