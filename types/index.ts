export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'admin' | 'super_admin';
  status: 'active' | 'restricted' | 'suspended';
  avatar?: string;
  joinedAt: string;
  lastActive?: string;
  restrictions?: string[];
  certifications?: string[];
}

export interface Post {
  id: string;
  title: string;
  description: string;
  content?: string;
  type: 'sermon' | 'announcement' | 'event' | 'teaching' | 'devotional';
  author: string;
  author_id: string;
  views: number;
  likes: string[]; // Array of user IDs who liked
  comments: Comment[];
  shares: number;
  mediaType?: 'video' | 'audio' | 'text';
  mediaUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  fileSize?: string;
  status: 'published' | 'pending' | 'rejected';
  created_at: string;
  updated_at: string;
  tags?: string[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  author_id: string;
  likes: string[];
  replies: Comment[];
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  instructor: string;
  instructor_id: string;
  enrolled_users: string[];
  assignments: Assignment[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  certificateTemplate?: string;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content?: string;
  videoUrl?: string;
  audioUrl?: string;
  documentUrl?: string;
  duration?: string;
  order: number;
  isCompleted?: boolean;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'quiz' | 'essay' | 'project' | 'discussion';
  questions?: Question[];
  dueDate?: string;
  maxScore: number;
  submissions: Submission[];
  created_at: string;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  userId: string;
  userName: string;
  answers: any[];
  score?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'pending';
  submittedAt: string;
  gradedAt?: string;
  gradedBy?: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  duration: string;
  audioUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  author: string;
  author_id: string;
  plays: number;
  likes: string[];
  comments: Comment[];
  shares: number;
  mediaType: 'audio' | 'video';
  fileSize?: string;
  transcript?: string;
  status: 'published' | 'pending' | 'rejected';
  created_at: string;
  updated_at: string;
  tags?: string[];
}

export interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  author: string;
  author_id: string;
  isAnonymous: boolean;
  prayers_count: number;
  responses: PrayerResponse[];
  status: 'active' | 'answered' | 'archived';
  isShared: boolean;
  created_at: string;
  updated_at?: string;
}

export interface PrayerResponse {
  id: string;
  content: string;
  author: string;
  author_id: string;
  isFromAdmin: boolean;
  created_at: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  type: 'public' | 'private' | 'restricted';
  creator_id: string;
  members: string[];
  moderators: string[];
  rules: string[];
  avatar?: string;
  created_at: string;
  messageCount?: number;
  isActive: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender_id: string;
  senderName: string;
  communityId?: string;
  recipientId?: string;
  type: 'text' | 'image' | 'audio' | 'video' | 'file';
  fileUrl?: string;
  fileName?: string;
  replyTo?: string;
  reactions: { [emoji: string]: string[] };
  isEdited: boolean;
  isDeleted: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'prayer' | 'course' | 'message' | 'community' | 'system';
  recipient_id?: string; // If null, it's a global notification
  sender_id: string;
  senderName: string;
  isRead: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  expiresAt?: string;
}

export interface BibleVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  language: 'amharic' | 'english' | 'oromo';
  version: string;
}

export interface SabbathSchoolLesson {
  id: string;
  title: string;
  quarter: string;
  week: number;
  date: string;
  memoryVerse: string;
  content: {
    introduction: string;
    dailyLessons: DailyLesson[];
    discussion: string[];
    application: string;
  };
  language: 'amharic' | 'english' | 'oromo';
  pdfUrl?: string;
  audioUrl?: string;
  created_at: string;
}

export interface DailyLesson {
  day: string;
  title: string;
  content: string;
  bibleReading: string;
  questions: string[];
}

export interface UserSubmission {
  id: string;
  title: string;
  description: string;
  type: 'sermon' | 'song' | 'podcast' | 'testimony' | 'announcement';
  content?: string;
  fileUrl?: string;
  mediaType?: 'audio' | 'video' | 'document';
  submitter_id: string;
  submitterName: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  created_at: string;
}

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseName: string;
  completionDate: string;
  score: number;
  certificateUrl?: string;
  issuedBy: string;
  verified: boolean;
}

export interface VideoCall {
  id: string;
  title: string;
  type: 'one_on_one' | 'group' | 'community';
  host_id: string;
  participants: string[];
  status: 'scheduled' | 'active' | 'ended';
  startTime: string;
  endTime?: string;
  recordingUrl?: string;
  communityId?: string;
}

export interface AppState {
  currentView: string;
  currentUser: User | null;
  userProfile: any;
  isMenuOpen: boolean;
  loading: boolean;
  accessToken: string | null;
  posts: Post[];
  courses: Course[];
  podcasts: Podcast[];
  prayerRequests: PrayerRequest[];
  communities: Community[];
  messages: Message[];
  notifications: Notification[];
  userSubmissions: UserSubmission[];
  sabbathLessons: SabbathSchoolLesson[];
  certificates: Certificate[];
  stats: any;
  selectedContent: any;
  showContentModal: boolean;
  playingPodcast: string | null;
  activeChat?: string;
  unreadCount: number;
}

export interface FormStates {
  loginForm: { email: string; password: string };
  signupForm: { email: string; password: string; name: string; phone: string; role: string };
  postForm: { 
    title: string; 
    description: string; 
    content: string; 
    type: string;
    mediaType: string;
    file?: File;
    tags: string[];
  };
  podcastForm: { 
    title: string; 
    description: string; 
    duration: string;
    mediaType: string;
    file?: File;
    transcript?: string;
    tags: string[];
  };
  prayerForm: { title: string; description: string; isAnonymous: boolean };
  courseForm: { 
    title: string; 
    description: string; 
    instructor: string; 
    lessons: number;
    difficulty: string;
    category: string;
    duration: string;
  };
  messageForm: { content: string; type: string; file?: File };
  communityForm: { name: string; description: string; type: string; rules: string[] };
  submissionForm: {
    title: string;
    description: string;
    type: string;
    content?: string;
    file?: File;
    mediaType?: string;
  };
}