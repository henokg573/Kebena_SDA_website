import { User, Post, Course, Podcast, PrayerRequest, Community, Message, Notification, UserSubmission, Certificate } from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'kebena_sda_current_user',
  POSTS: 'kebena_sda_posts',
  COURSES: 'kebena_sda_courses',
  PODCASTS: 'kebena_sda_podcasts',
  PRAYER_REQUESTS: 'kebena_sda_prayer_requests',
  COMMUNITIES: 'kebena_sda_communities',
  MESSAGES: 'kebena_sda_messages',
  NOTIFICATIONS: 'kebena_sda_notifications',
  USER_SUBMISSIONS: 'kebena_sda_user_submissions',
  SABBATH_LESSONS: 'kebena_sda_sabbath_lessons',
  CERTIFICATES: 'kebena_sda_certificates',
  USERS: 'kebena_sda_users',
  BIBLE_BOOKMARKS: 'kebena_sda_bible_bookmarks',
  USER_PROGRESS: 'kebena_sda_user_progress'
};

export const storageUtils = {
  // User management
  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  setCurrentUser(user: User): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error setting current user:', error);
    }
  },

  removeCurrentUser(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch (error) {
      console.error('Error removing current user:', error);
    }
  },

  // Posts
  getPosts(): Post[] {
    try {
      const postsData = localStorage.getItem(STORAGE_KEYS.POSTS);
      return postsData ? JSON.parse(postsData) : [];
    } catch (error) {
      console.error('Error getting posts:', error);
      return [];
    }
  },

  setPosts(posts: Post[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (error) {
      console.error('Error setting posts:', error);
    }
  },

  // Courses
  getCourses(): Course[] {
    try {
      const coursesData = localStorage.getItem(STORAGE_KEYS.COURSES);
      return coursesData ? JSON.parse(coursesData) : [];
    } catch (error) {
      console.error('Error getting courses:', error);
      return [];
    }
  },

  setCourses(courses: Course[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (error) {
      console.error('Error setting courses:', error);
    }
  },

  // Podcasts
  getPodcasts(): Podcast[] {
    try {
      const podcastsData = localStorage.getItem(STORAGE_KEYS.PODCASTS);
      return podcastsData ? JSON.parse(podcastsData) : [];
    } catch (error) {
      console.error('Error getting podcasts:', error);
      return [];
    }
  },

  setPodcasts(podcasts: Podcast[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PODCASTS, JSON.stringify(podcasts));
    } catch (error) {
      console.error('Error setting podcasts:', error);
    }
  },

  // Prayer Requests
  getPrayerRequests(): PrayerRequest[] {
    try {
      const prayerRequestsData = localStorage.getItem(STORAGE_KEYS.PRAYER_REQUESTS);
      return prayerRequestsData ? JSON.parse(prayerRequestsData) : [];
    } catch (error) {
      console.error('Error getting prayer requests:', error);
      return [];
    }
  },

  setPrayerRequests(prayerRequests: PrayerRequest[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PRAYER_REQUESTS, JSON.stringify(prayerRequests));
    } catch (error) {
      console.error('Error setting prayer requests:', error);
    }
  },

  // Communities
  getCommunities(): Community[] {
    try {
      const communitiesData = localStorage.getItem(STORAGE_KEYS.COMMUNITIES);
      return communitiesData ? JSON.parse(communitiesData) : [];
    } catch (error) {
      console.error('Error getting communities:', error);
      return [];
    }
  },

  setCommunities(communities: Community[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMUNITIES, JSON.stringify(communities));
    } catch (error) {
      console.error('Error setting communities:', error);
    }
  },

  // Messages
  getMessages(): Message[] {
    try {
      const messagesData = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return messagesData ? JSON.parse(messagesData) : [];
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  },

  setMessages(messages: Message[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (error) {
      console.error('Error setting messages:', error);
    }
  },

  // Notifications
  getNotifications(): Notification[] {
    try {
      const notificationsData = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return notificationsData ? JSON.parse(notificationsData) : [];
    } catch (error) {
      console.error('Error getting notifications:', error);
      return [];
    }
  },

  setNotifications(notifications: Notification[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (error) {
      console.error('Error setting notifications:', error);
    }
  },

  // User Submissions
  getUserSubmissions(): UserSubmission[] {
    try {
      const submissionsData = localStorage.getItem(STORAGE_KEYS.USER_SUBMISSIONS);
      return submissionsData ? JSON.parse(submissionsData) : [];
    } catch (error) {
      console.error('Error getting user submissions:', error);
      return [];
    }
  },

  setUserSubmissions(submissions: UserSubmission[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_SUBMISSIONS, JSON.stringify(submissions));
    } catch (error) {
      console.error('Error setting user submissions:', error);
    }
  },

  // Certificates
  getCertificates(): Certificate[] {
    try {
      const certificatesData = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      return certificatesData ? JSON.parse(certificatesData) : [];
    } catch (error) {
      console.error('Error getting certificates:', error);
      return [];
    }
  },

  setCertificates(certificates: Certificate[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
    } catch (error) {
      console.error('Error setting certificates:', error);
    }
  },

  // Users list (for admin management)
  getUsers(): User[] {
    try {
      const usersData = localStorage.getItem(STORAGE_KEYS.USERS);
      return usersData ? JSON.parse(usersData) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },

  setUsers(users: User[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (error) {
      console.error('Error setting users:', error);
    }
  },

  // Bible bookmarks
  getBibleBookmarks(): any[] {
    try {
      const bookmarksData = localStorage.getItem(STORAGE_KEYS.BIBLE_BOOKMARKS);
      return bookmarksData ? JSON.parse(bookmarksData) : [];
    } catch (error) {
      console.error('Error getting bible bookmarks:', error);
      return [];
    }
  },

  setBibleBookmarks(bookmarks: any[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.BIBLE_BOOKMARKS, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error setting bible bookmarks:', error);
    }
  },

  // User progress
  getUserProgress(userId: string): any {
    try {
      const progressData = localStorage.getItem(`${STORAGE_KEYS.USER_PROGRESS}_${userId}`);
      return progressData ? JSON.parse(progressData) : {};
    } catch (error) {
      console.error('Error getting user progress:', error);
      return {};
    }
  },

  setUserProgress(userId: string, progress: any): void {
    try {
      localStorage.setItem(`${STORAGE_KEYS.USER_PROGRESS}_${userId}`, JSON.stringify(progress));
    } catch (error) {
      console.error('Error setting user progress:', error);
    }
  },

  // Utility functions
  clearAllData(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      console.log('All data cleared from localStorage');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  },

  exportData(): string {
    try {
      const allData: any = {};
      Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
        const data = localStorage.getItem(storageKey);
        if (data) {
          allData[key] = JSON.parse(data);
        }
      });
      return JSON.stringify(allData, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      return '{}';
    }
  },

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      Object.entries(data).forEach(([key, value]) => {
        const storageKey = STORAGE_KEYS[key as keyof typeof STORAGE_KEYS];
        if (storageKey) {
          localStorage.setItem(storageKey, JSON.stringify(value));
        }
      });
      console.log('Data imported successfully');
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
};