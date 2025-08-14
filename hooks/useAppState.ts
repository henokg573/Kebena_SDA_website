import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User, Community, Message, Notification, UserSubmission, Certificate, Assignment, Submission } from '../types';
import { storageUtils } from '../utils/storage';
import { 
  initialPosts, 
  initialCourses, 
  initialPodcasts, 
  initialPrayerRequests,
  initialCommunities,
  initialSabbathLessons,
  initialNotifications,
  sampleBibleVerses
} from '../constants/initialData';

// Define predefined admins directly here to avoid import issues
const PREDEFINED_ADMINS = [
  {
    id: 'super_admin_1',
    email: 'pastor@kebenasda.org',
    name: 'Pastor Abraham Tessema',
    phone: '+251911234567',
    role: 'super_admin' as const,
    status: 'active' as const,
    joinedAt: '2020-01-01T00:00:00Z',
    restrictions: [],
    certifications: []
  },
  {
    id: 'admin_1',
    email: 'elder@kebenasda.org',
    name: 'Elder Samuel Mekonnen',
    phone: '+251911234568',
    role: 'admin' as const,
    status: 'active' as const,
    joinedAt: '2020-06-01T00:00:00Z',
    restrictions: [],
    certifications: []
  },
  {
    id: 'admin_2',
    email: 'deacon@kebenasda.org',
    name: 'Deacon Ruth Alemayehu',
    phone: '+251911234569',
    role: 'admin' as const,
    status: 'active' as const,
    joinedAt: '2021-01-01T00:00:00Z',
    restrictions: [],
    certifications: []
  }
];

export function useAppState() {
  // Core state
  const [currentView, setCurrentView] = useState('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Data states
  const [posts, setPosts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<UserSubmission[]>([]);
  const [sabbathLessons, setSabbathLessons] = useState([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [bibleVerses] = useState(sampleBibleVerses || []);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({});

  // Content states
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [playingPodcast, setPlayingPodcast] = useState<string | null>(null);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Form states
  const [loginForm, setLoginForm] = useState({ 
    email: '', 
    password: '' 
  });
  
  const [signupForm, setSignupForm] = useState({ 
    email: '', 
    password: '', 
    name: '', 
    phone: '',
    role: 'user'
  });
  
  const [postForm, setPostForm] = useState({ 
    title: '', 
    description: '', 
    content: '', 
    type: 'sermon',
    mediaType: 'text',
    file: undefined,
    tags: []
  });
  
  const [podcastForm, setPodcastForm] = useState({ 
    title: '', 
    description: '', 
    duration: '',
    mediaType: 'audio',
    file: undefined,
    transcript: '',
    tags: []
  });
  
  const [prayerForm, setPrayerForm] = useState({ 
    title: '', 
    description: '', 
    isAnonymous: false 
  });
  
  const [courseForm, setCourseForm] = useState({ 
    title: '', 
    description: '', 
    instructor: '', 
    lessons: 5,
    difficulty: 'beginner',
    category: 'Bible Study',
    duration: '4 weeks'
  });

  const [messageForm, setMessageForm] = useState({
    content: '',
    type: 'text',
    file: undefined
  });

  const [communityForm, setCommunityForm] = useState({
    name: '',
    description: '',
    type: 'public',
    rules: []
  });

  const [submissionForm, setSubmissionForm] = useState({
    title: '',
    description: '',
    type: 'sermon',
    content: '',
    file: undefined,
    mediaType: 'text'
  });

  // Initialize app with localStorage persistence
  const initializeApp = async () => {
    try {
      console.log('Initializing app...');
      
      const savedUser = storageUtils.getCurrentUser();
      if (savedUser) {
        setCurrentUser(savedUser);
        setUserProfile(savedUser);
        console.log('Restored user:', savedUser);
      }

      // Initialize all data with safe fallbacks
      const savedPosts = storageUtils.getPosts();
      if (savedPosts && savedPosts.length > 0) {
        setPosts(savedPosts);
      } else {
        setPosts(initialPosts || []);
        if (initialPosts && initialPosts.length > 0) {
          storageUtils.setPosts(initialPosts);
        }
      }

      const savedCourses = storageUtils.getCourses();
      if (savedCourses && savedCourses.length > 0) {
        setCourses(savedCourses);
      } else {
        setCourses(initialCourses || []);
        if (initialCourses && initialCourses.length > 0) {
          storageUtils.setCourses(initialCourses);
        }
      }

      const savedPodcasts = storageUtils.getPodcasts();
      if (savedPodcasts && savedPodcasts.length > 0) {
        setPodcasts(savedPodcasts);
      } else {
        setPodcasts(initialPodcasts || []);
        if (initialPodcasts && initialPodcasts.length > 0) {
          storageUtils.setPodcasts(initialPodcasts);
        }
      }

      const savedPrayerRequests = storageUtils.getPrayerRequests();
      if (savedPrayerRequests && savedPrayerRequests.length > 0) {
        setPrayerRequests(savedPrayerRequests);
      } else {
        setPrayerRequests(initialPrayerRequests || []);
        if (initialPrayerRequests && initialPrayerRequests.length > 0) {
          storageUtils.setPrayerRequests(initialPrayerRequests);
        }
      }

      // Initialize new features with safe fallbacks
      setCommunities(initialCommunities || []);
      setNotifications(initialNotifications || []);
      setSabbathLessons(initialSabbathLessons || []);
      setUsers(PREDEFINED_ADMINS || []);

      // Count unread notifications safely
      const notifs = initialNotifications || [];
      const unread = notifs.filter(n => 
        !n.isRead && (!n.recipient_id || n.recipient_id === savedUser?.id)
      ).length;
      setUnreadCount(unread);

      console.log('App initialized successfully');
    } catch (error) {
      console.error('Initialization error:', error);
      // Set safe defaults if initialization fails
      setPosts([]);
      setCourses([]);
      setPodcasts([]);
      setPrayerRequests([]);
      setCommunities([]);
      setNotifications([]);
      setSabbathLessons([]);
      setUsers(PREDEFINED_ADMINS || []);
    }
  };

  // Auto-save to localStorage when data changes
  useEffect(() => {
    if (posts && posts.length > 0) storageUtils.setPosts(posts);
  }, [posts]);

  useEffect(() => {
    if (courses && courses.length > 0) storageUtils.setCourses(courses);
  }, [courses]);

  useEffect(() => {
    if (podcasts && podcasts.length > 0) storageUtils.setPodcasts(podcasts);
  }, [podcasts]);

  useEffect(() => {
    if (prayerRequests && prayerRequests.length > 0) storageUtils.setPrayerRequests(prayerRequests);
  }, [prayerRequests]);

  useEffect(() => {
    if (currentUser) {
      storageUtils.setCurrentUser(currentUser);
      console.log('User saved to storage:', currentUser);
    }
  }, [currentUser]);

  // Auth handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!loginForm.email || !loginForm.password) {
        toast.error('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Check if it's a predefined admin
      let admin = null;
      if (PREDEFINED_ADMINS && Array.isArray(PREDEFINED_ADMINS)) {
        admin = PREDEFINED_ADMINS.find(a => a && a.email === loginForm.email);
      }
      
      let mockUser;
      if (admin) {
        mockUser = {
          ...admin,
          lastActive: new Date().toISOString()
        };
      } else {
        // Regular user login - create mock user for testing
        mockUser = {
          id: 'user_' + Date.now().toString(),
          email: loginForm.email,
          name: loginForm.email.split('@')[0],
          phone: '+251911000000',
          role: 'user' as const,
          status: 'active' as const,
          joinedAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          restrictions: [],
          certifications: []
        };
      }
      
      setCurrentUser(mockUser);
      setUserProfile(mockUser);
      
      // Navigate based on role
      const targetView = mockUser.role === 'user' ? 'user-dashboard' : 'admin-dashboard';
      setCurrentView(targetView);
      
      toast.success(`Welcome back, ${mockUser.name}!`);
      setLoginForm({ email: '', password: '' });
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!signupForm.email || !signupForm.password || !signupForm.name || !signupForm.phone) {
        toast.error('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Safely check if email already exists
      let existingAdmin = null;
      if (PREDEFINED_ADMINS && Array.isArray(PREDEFINED_ADMINS)) {
        existingAdmin = PREDEFINED_ADMINS.find(a => a && a.email === signupForm.email);
      }
      
      if (existingAdmin) {
        toast.error('This email is already registered. Please use login instead.');
        setLoading(false);
        return;
      }

      const newUser: User = {
        id: 'user_' + Date.now().toString(),
        email: signupForm.email,
        name: signupForm.name,
        phone: signupForm.phone,
        role: 'user',
        status: 'active',
        joinedAt: new Date().toISOString(),
        restrictions: [],
        certifications: []
      };

      // Add to users list
      setUsers(prev => [...(prev || []), newUser]);
      
      toast.success('Welcome to Kebena SDA Church! You can now login.');
      setCurrentView('login');
      setSignupForm({ email: '', password: '', name: '', phone: '', role: 'user' });
      
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setCurrentUser(null);
      setUserProfile(null);
      setAccessToken(null);
      setCurrentView('landing');
      setActiveChat(null);
      storageUtils.removeCurrentUser();
      toast.success('Goodbye! Come back soon.');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Content creation handlers
  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Please login to create content');
      return;
    }

    setLoading(true);
    try {
      const newPost = {
        id: Date.now().toString(),
        ...postForm,
        author: currentUser.name,
        author_id: currentUser.id,
        views: 0,
        likes: [],
        shares: 0,
        comments: [],
        mediaUrl: postForm.file ? URL.createObjectURL(postForm.file) : undefined,
        thumbnailUrl: postForm.mediaType === 'video' ? 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=225&fit=crop' : undefined,
        duration: postForm.mediaType !== 'text' ? '00:00' : undefined,
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const updatedPosts = [newPost, ...(posts || [])];
      setPosts(updatedPosts);
      setPostForm({ 
        title: '', 
        description: '', 
        content: '', 
        type: 'sermon',
        mediaType: 'text',
        file: undefined,
        tags: []
      });
      toast.success('Content published successfully!');
    } catch (error) {
      console.error('Create post error:', error);
      toast.error('Publishing failed');
    } finally {
      setLoading(false);
    }
  };

  const createPodcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Please login to create podcasts');
      return;
    }

    setLoading(true);
    try {
      const newPodcast = {
        id: Date.now().toString(),
        ...podcastForm,
        author: currentUser.name,
        author_id: currentUser.id,
        plays: 0,
        likes: [],
        shares: 0,
        comments: [],
        audioUrl: podcastForm.mediaType === 'audio' && podcastForm.file ? URL.createObjectURL(podcastForm.file) : undefined,
        videoUrl: podcastForm.mediaType === 'video' && podcastForm.file ? URL.createObjectURL(podcastForm.file) : undefined,
        thumbnailUrl: podcastForm.mediaType === 'video' ? 'https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=400&h=225&fit=crop' : undefined,
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const updatedPodcasts = [newPodcast, ...(podcasts || [])];
      setPodcasts(updatedPodcasts);
      setPodcastForm({ 
        title: '', 
        description: '', 
        duration: '',
        mediaType: 'audio',
        file: undefined,
        transcript: '',
        tags: []
      });
      toast.success('Podcast created successfully!');
    } catch (error) {
      console.error('Create podcast error:', error);
      toast.error('Podcast creation failed');
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Please login to create courses');
      return;
    }

    setLoading(true);
    try {
      const lessons = Array.from({ length: courseForm.lessons }, (_, i) => ({
        id: `lesson_${i + 1}`,
        title: `Lesson ${i + 1}`,
        description: `Lesson ${i + 1} content description`,
        order: i + 1
      }));

      const newCourse = {
        id: Date.now().toString(),
        ...courseForm,
        lessons,
        instructor_id: currentUser.id,
        enrolled_users: [],
        assignments: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const updatedCourses = [newCourse, ...(courses || [])];
      setCourses(updatedCourses);
      setCourseForm({ 
        title: '', 
        description: '', 
        instructor: '', 
        lessons: 5,
        difficulty: 'beginner',
        category: 'Bible Study',
        duration: '4 weeks'
      });
      toast.success('Course created successfully!');
    } catch (error) {
      console.error('Create course error:', error);
      toast.error('Course creation failed');
    } finally {
      setLoading(false);
    }
  };

  // User submission handler
  const submitUserContent = async (form: any) => {
    if (!currentUser) {
      toast.error('Please login to submit content');
      return;
    }

    try {
      const newSubmission: UserSubmission = {
        id: Date.now().toString(),
        ...form,
        submitter_id: currentUser.id,
        submitterName: currentUser.name,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      setUserSubmissions(prev => [newSubmission, ...prev]);
      toast.success('Content submitted for review. Admin will review and approve.');
      
      // Notify admins
      const adminNotification: Notification = {
        id: Date.now().toString() + '_notification',
        title: 'New Content Submission',
        content: `${currentUser.name} submitted: ${form.title}`,
        type: 'system',
        sender_id: currentUser.id,
        senderName: currentUser.name,
        isRead: false,
        priority: 'medium',
        created_at: new Date().toISOString()
      };
      
      setNotifications(prev => [adminNotification, ...prev]);
      setSubmissionForm({
        title: '',
        description: '',
        type: 'sermon',
        content: '',
        file: undefined,
        mediaType: 'text'
      });
    } catch (error) {
      toast.error('Submission failed');
    }
  };

  // Like/Comment/Share handlers
  const likeContent = async (contentId: string, type: 'post' | 'podcast') => {
    if (!currentUser) {
      toast.error('Please login to like content');
      return;
    }

    try {
      if (type === 'post') {
        const updatedPosts = (posts || []).map(post => {
          if (post.id === contentId) {
            const hasLiked = (post.likes || []).includes(currentUser.id);
            return {
              ...post,
              likes: hasLiked 
                ? (post.likes || []).filter(id => id !== currentUser.id)
                : [...(post.likes || []), currentUser.id]
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      } else {
        const updatedPodcasts = (podcasts || []).map(podcast => {
          if (podcast.id === contentId) {
            const hasLiked = (podcast.likes || []).includes(currentUser.id);
            return {
              ...podcast,
              likes: hasLiked 
                ? (podcast.likes || []).filter(id => id !== currentUser.id)
                : [...(podcast.likes || []), currentUser.id]
            };
          }
          return podcast;
        });
        setPodcasts(updatedPodcasts);
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const addComment = async (contentId: string, comment: string, type: 'post' | 'podcast') => {
    if (!currentUser) {
      toast.error('Please login to comment');
      return;
    }

    try {
      const newComment = {
        id: Date.now().toString(),
        content: comment,
        author: currentUser.name,
        author_id: currentUser.id,
        likes: [],
        replies: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (type === 'post') {
        const updatedPosts = (posts || []).map(post => {
          if (post.id === contentId) {
            return {
              ...post,
              comments: [...(post.comments || []), newComment]
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      } else {
        const updatedPodcasts = (podcasts || []).map(podcast => {
          if (podcast.id === contentId) {
            return {
              ...podcast,
              comments: [...(podcast.comments || []), newComment]
            };
          }
          return podcast;
        });
        setPodcasts(updatedPodcasts);
      }

      toast.success('Comment added!');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const shareContent = async (contentId: string, type: 'post' | 'podcast', platform?: string) => {
    try {
      if (type === 'post') {
        const updatedPosts = (posts || []).map(post => {
          if (post.id === contentId) {
            return { ...post, shares: (post.shares || 0) + 1 };
          }
          return post;
        });
        setPosts(updatedPosts);
      } else {
        const updatedPodcasts = (podcasts || []).map(podcast => {
          if (podcast.id === contentId) {
            return { ...podcast, shares: (podcast.shares || 0) + 1 };
          }
          return podcast;
        });
        setPodcasts(updatedPodcasts);
      }

      if (platform) {
        // Simulate social media sharing
        const content = type === 'post' 
          ? posts.find(p => p.id === contentId)
          : podcasts.find(p => p.id === contentId);
        
        const shareUrl = `https://kebenasda.org/${type}/${contentId}`;
        const shareText = `Check out: ${content?.title} - ${content?.description}`;
        
        if (navigator.share) {
          await navigator.share({
            title: content?.title,
            text: shareText,
            url: shareUrl
          });
        } else {
          await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
          toast.success('Link copied to clipboard!');
        }
      } else {
        toast.success('Content shared!');
      }
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  // Community handlers
  const createCommunity = async (form: any) => {
    if (!currentUser || currentUser.role !== 'super_admin') {
      toast.error('Only super admin can create communities');
      return;
    }

    try {
      const newCommunity: Community = {
        id: Date.now().toString(),
        ...form,
        creator_id: currentUser.id,
        members: [currentUser.id],
        moderators: [currentUser.id],
        created_at: new Date().toISOString(),
        messageCount: 0,
        isActive: true
      };

      setCommunities(prev => [newCommunity, ...prev]);
      toast.success('Community created successfully!');
      setCommunityForm({
        name: '',
        description: '',
        type: 'public',
        rules: []
      });
    } catch (error) {
      toast.error('Community creation failed');
    }
  };

  const joinCommunity = async (communityId: string) => {
    if (!currentUser) {
      toast.error('Please login to join communities');
      return;
    }

    try {
      setCommunities(prev => prev.map(community => {
        if (community.id === communityId && !community.members.includes(currentUser.id)) {
          return {
            ...community,
            members: [...community.members, currentUser.id]
          };
        }
        return community;
      }));
      
      toast.success('Joined community successfully!');
    } catch (error) {
      toast.error('Failed to join community');
    }
  };

  const sendMessage = async (content: string, communityId?: string, recipientId?: string) => {
    if (!currentUser) return;

    try {
      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        sender_id: currentUser.id,
        senderName: currentUser.name,
        communityId,
        recipientId,
        type: 'text',
        reactions: {},
        isEdited: false,
        isDeleted: false,
        created_at: new Date().toISOString()
      };

      setMessages(prev => [newMessage, ...prev]);
      
      // Update community message count
      if (communityId) {
        setCommunities(prev => prev.map(community => 
          community.id === communityId 
            ? { ...community, messageCount: (community.messageCount || 0) + 1 }
            : community
        ));
      }

      setMessageForm({ content: '', type: 'text', file: undefined });
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  // Prayer request handler
  const submitPrayerRequest = async (form: any) => {
    if (!currentUser) {
      toast.error('Please login to submit prayer requests');
      return;
    }

    try {
      const newRequest = {
        id: Date.now().toString(),
        ...form,
        author: form.isAnonymous ? 'Anonymous' : currentUser.name,
        author_id: currentUser.id,
        prayers_count: 0,
        responses: [],
        status: 'active',
        isShared: false,
        created_at: new Date().toISOString()
      };

      const updatedRequests = [newRequest, ...(prayerRequests || [])];
      setPrayerRequests(updatedRequests);
      toast.success('Prayer request submitted successfully!');
    } catch (error) {
      console.error('Submit prayer error:', error);
      toast.error('Failed to submit prayer request');
    }
  };

  // Prayer response handler
  const respondToPrayer = async (prayerId: string, response: string) => {
    if (!currentUser) return;

    try {
      const newResponse = {
        id: Date.now().toString(),
        content: response,
        author: currentUser.name,
        author_id: currentUser.id,
        isFromAdmin: currentUser.role !== 'user',
        created_at: new Date().toISOString()
      };

      const updatedRequests = (prayerRequests || []).map(request => {
        if (request.id === prayerId) {
          return {
            ...request,
            responses: [...(request.responses || []), newResponse]
          };
        }
        return request;
      });
      
      setPrayerRequests(updatedRequests);
      toast.success('Response added to prayer request');
    } catch (error) {
      toast.error('Failed to respond to prayer');
    }
  };

  // Assignment handlers
  const submitAssignment = async (assignmentId: string, answers: any[]) => {
    if (!currentUser) return;

    try {
      const submission = {
        id: Date.now().toString(),
        assignmentId,
        userId: currentUser.id,
        userName: currentUser.name,
        answers,
        status: 'submitted',
        submittedAt: new Date().toISOString()
      };

      // Update course with submission
      const updatedCourses = (courses || []).map(course => ({
        ...course,
        assignments: (course.assignments || []).map((assignment: Assignment) => {
          if (assignment.id === assignmentId) {
            return {
              ...assignment,
              submissions: [...(assignment.submissions || []), submission]
            };
          }
          return assignment;
        })
      }));

      setCourses(updatedCourses);
      toast.success('Assignment submitted successfully!');
    } catch (error) {
      toast.error('Assignment submission failed');
    }
  };

  const gradeAssignment = async (submissionId: string, score: number, feedback: string) => {
    if (!currentUser || currentUser.role === 'user') return;

    try {
      const updatedCourses = (courses || []).map(course => ({
        ...course,
        assignments: (course.assignments || []).map((assignment: Assignment) => ({
          ...assignment,
          submissions: (assignment.submissions || []).map((submission: Submission) => {
            if (submission.id === submissionId) {
              return {
                ...submission,
                score,
                feedback,
                status: 'graded',
                gradedAt: new Date().toISOString(),
                gradedBy: currentUser.name
              };
            }
            return submission;
          })
        }))
      }));

      setCourses(updatedCourses);
      toast.success('Assignment graded successfully!');
    } catch (error) {
      toast.error('Grading failed');
    }
  };

  // User management handlers
  const restrictUser = async (userId: string, restrictions: string[]) => {
    if (!currentUser || currentUser.role === 'user') return;

    try {
      setUsers(prev => prev.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            restrictions,
            status: restrictions.length > 0 ? 'restricted' : 'active'
          };
        }
        return user;
      }));

      toast.success('User restrictions updated');
    } catch (error) {
      toast.error('Failed to update user restrictions');
    }
  };

  const createUser = async (userData: Partial<User>) => {
    if (!currentUser || currentUser.role === 'user') return;

    try {
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email || '',
        name: userData.name || '',
        phone: userData.phone || '',
        role: userData.role || 'user',
        status: 'active',
        joinedAt: new Date().toISOString(),
        restrictions: [],
        certifications: []
      };

      setUsers(prev => [...prev, newUser]);
      toast.success('User created successfully!');
    } catch (error) {
      toast.error('User creation failed');
    }
  };

  // Content approval handlers
  const approveUserSubmission = async (submissionId: string) => {
    if (!currentUser || currentUser.role === 'user') return;

    try {
      const submission = userSubmissions.find(s => s.id === submissionId);
      if (!submission) return;

      // Approve submission and add to appropriate content array
      if (submission.type === 'sermon' || submission.type === 'announcement') {
        const newPost = {
          id: Date.now().toString(),
          title: submission.title,
          description: submission.description,
          content: submission.content,
          type: submission.type,
          author: submission.submitterName,
          author_id: submission.submitter_id,
          views: 0,
          likes: [],
          shares: 0,
          comments: [],
          mediaType: submission.mediaType || 'text',
          mediaUrl: submission.fileUrl,
          status: 'published',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          tags: []
        };
        setPosts(prev => [newPost, ...prev]);
      } else if (submission.type === 'podcast') {
        const newPodcast = {
          id: Date.now().toString(),
          title: submission.title,
          description: submission.description,
          duration: '00:00',
          author: submission.submitterName,
          author_id: submission.submitter_id,
          plays: 0,
          likes: [],
          shares: 0,
          comments: [],
          mediaType: submission.mediaType === 'video' ? 'video' : 'audio',
          audioUrl: submission.mediaType === 'audio' ? submission.fileUrl : undefined,
          videoUrl: submission.mediaType === 'video' ? submission.fileUrl : undefined,
          status: 'published',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          tags: []
        };
        setPodcasts(prev => [newPodcast, ...prev]);
      }

      // Update submission status
      setUserSubmissions(prev => prev.map(s => 
        s.id === submissionId 
          ? { ...s, status: 'approved', reviewedBy: currentUser.name, reviewedAt: new Date().toISOString() }
          : s
      ));

      toast.success('Submission approved and published!');
    } catch (error) {
      toast.error('Approval failed');
    }
  };

  const rejectUserSubmission = async (submissionId: string, reason: string) => {
    if (!currentUser || currentUser.role === 'user') return;

    try {
      setUserSubmissions(prev => prev.map(s => 
        s.id === submissionId 
          ? { 
              ...s, 
              status: 'rejected', 
              reviewedBy: currentUser.name, 
              reviewedAt: new Date().toISOString(),
              adminNotes: reason
            }
          : s
      ));

      toast.success('Submission rejected');
    } catch (error) {
      toast.error('Rejection failed');
    }
  };

  // Notification handlers
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const createNotification = (title: string, content: string, type: any, priority = 'medium') => {
    if (!currentUser) return;

    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      content,
      type,
      sender_id: currentUser.id,
      senderName: currentUser.name,
      isRead: false,
      priority,
      created_at: new Date().toISOString()
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  // Other handlers
  const enrollInCourse = async (courseId: string) => {
    if (!currentUser) {
      toast.error('Please login to enroll in courses');
      return;
    }

    try {
      const updatedCourses = (courses || []).map(course => {
        if (course.id === courseId && !course.enrolled_users.includes(currentUser.id)) {
          return {
            ...course,
            enrolled_users: [...course.enrolled_users, currentUser.id]
          };
        }
        return course;
      });
      
      setCourses(updatedCourses);
      toast.success('Successfully enrolled in course!');
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error('Enrollment failed');
    }
  };

  const playPodcast = async (podcastId: string) => {
    try {
      const updatedPodcasts = (podcasts || []).map(podcast => {
        if (podcast.id === podcastId) {
          return { ...podcast, plays: (podcast.plays || 0) + 1 };
        }
        return podcast;
      });
      
      setPodcasts(updatedPodcasts);
      setPlayingPodcast(playingPodcast === podcastId ? null : podcastId);
      toast.success(playingPodcast === podcastId ? 'Paused' : 'Now playing');
    } catch (error) {
      console.error('Play error:', error);
    }
  };

  const viewContent = async (contentId: string, content: any) => {
    try {
      const updatedPosts = (posts || []).map(post => {
        if (post.id === contentId) {
          return { ...post, views: (post.views || 0) + 1 };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      setSelectedContent(content);
      setShowContentModal(true);
    } catch (error) {
      console.error('View error:', error);
    }
  };

  const deleteContent = async (contentId: string, type: 'post' | 'podcast' | 'course' | 'prayer') => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      switch (type) {
        case 'post':
          setPosts((posts || []).filter(post => post.id !== contentId));
          break;
        case 'podcast':
          setPodcasts((podcasts || []).filter(podcast => podcast.id !== contentId));
          break;
        case 'course':
          setCourses((courses || []).filter(course => course.id !== contentId));
          break;
        case 'prayer':
          setPrayerRequests((prayerRequests || []).filter(request => request.id !== contentId));
          break;
      }
      toast.success('Item deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Delete failed');
    }
  };

  return {
    // State
    currentView,
    setCurrentView,
    currentUser,
    userProfile,
    isMenuOpen,
    setIsMenuOpen,
    loading,
    accessToken,
    posts: posts || [],
    courses: courses || [],
    podcasts: podcasts || [],
    prayerRequests: prayerRequests || [],
    communities: communities || [],
    messages: messages || [],
    notifications: notifications || [],
    userSubmissions: userSubmissions || [],
    sabbathLessons: sabbathLessons || [],
    certificates: certificates || [],
    bibleVerses: bibleVerses || [],
    users: users || [],
    stats,
    selectedContent,
    showContentModal,
    setShowContentModal,
    playingPodcast,
    activeChat,
    setActiveChat,
    unreadCount,

    // Forms
    loginForm,
    setLoginForm,
    signupForm,
    setSignupForm,
    postForm,
    setPostForm,
    podcastForm,
    setPodcastForm,
    courseForm,
    setCourseForm,
    messageForm,
    setMessageForm,
    communityForm,
    setCommunityForm,
    submissionForm,
    setSubmissionForm,

    // Handlers
    initializeApp,
    handleLogin,
    handleSignup,
    handleLogout,
    createPost,
    createPodcast,
    createCourse,
    submitPrayerRequest,
    submitUserContent,
    enrollInCourse,
    likeContent,
    addComment,
    shareContent,
    playPodcast,
    viewContent,
    deleteContent,
    createCommunity,
    joinCommunity,
    sendMessage,
    markNotificationAsRead,
    createNotification,
    respondToPrayer,
    submitAssignment,
    gradeAssignment,
    restrictUser,
    createUser,
    approveUserSubmission,
    rejectUserSubmission
  };
}