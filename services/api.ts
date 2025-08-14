// Enhanced API service for local development with localStorage persistence

export class ApiService {
  private mockDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

  async checkSession() {
    await this.mockDelay(200);
    return null;
  }

  async fetchUserProfile(token: string) {
    await this.mockDelay(300);
    return {
      id: '1',
      email: 'user@example.com',
      name: 'Test User',
      role: 'member'
    };
  }

  async login(email: string, password: string) {
    await this.mockDelay();
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    return {
      access_token: 'mock_token_' + Date.now(),
      user: {
        id: '1',
        email,
        user_metadata: {
          name: email.split('@')[0],
          role: email.includes('admin') ? 'admin' : 'member'
        }
      }
    };
  }

  async signup(signupForm: any) {
    await this.mockDelay();
    
    if (!signupForm.email || !signupForm.password || !signupForm.name) {
      throw new Error('All fields are required');
    }

    return {
      user: {
        id: '1',
        email: signupForm.email,
        user_metadata: {
          name: signupForm.name,
          role: signupForm.role
        }
      }
    };
  }

  async logout() {
    await this.mockDelay(200);
    return true;
  }

  // Content methods (now simplified since data is managed in the hook)
  async fetchPosts() {
    await this.mockDelay();
    return [];
  }

  async fetchCourses() {
    await this.mockDelay();
    return [];
  }

  async fetchPodcasts() {
    await this.mockDelay();
    return [];
  }

  async fetchStats() {
    await this.mockDelay();
    return {
      totalUsers: 250,
      totalPosts: 45,
      totalCourses: 12,
      totalPodcasts: 28,
      totalViews: 1250,
      totalPlays: 890
    };
  }

  async fetchPrayerRequests() {
    await this.mockDelay();
    return [];
  }

  // Mock methods for content operations
  async createContent() {
    await this.mockDelay();
    return { success: true };
  }

  async deleteContent() {
    await this.mockDelay();
    return { success: true };
  }

  async enrollInCourse() {
    await this.mockDelay();
    return { success: true };
  }

  async likeContent() {
    await this.mockDelay();
    return true;
  }

  async playPodcast() {
    await this.mockDelay();
    return true;
  }

  async viewContent() {
    await this.mockDelay();
    return true;
  }
}

export const apiService = new ApiService();