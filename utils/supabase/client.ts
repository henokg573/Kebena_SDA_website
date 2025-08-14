// Mock Supabase client for local development

interface MockUser {
  id: string;
  email?: string;
  user_metadata?: any;
}

interface MockSession {
  access_token: string;
  user: MockUser;
}

class MockSupabaseClient {
  auth = {
    getSession: async () => {
      // Return no session for local development
      return { data: { session: null }, error: null };
    },

    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      // Mock login validation
      if (!email || !password) {
        return { 
          data: { session: null }, 
          error: { message: 'Email and password are required' } 
        };
      }

      // Mock successful login
      const mockSession: MockSession = {
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

      return { data: { session: mockSession }, error: null };
    },

    signOut: async () => {
      return { error: null };
    },

    getUser: async (token?: string) => {
      if (!token) {
        return { data: { user: null }, error: { message: 'No token provided' } };
      }

      // Mock user data
      return {
        data: {
          user: {
            id: '1',
            email: 'user@example.com',
            user_metadata: {
              name: 'Test User',
              role: 'member'
            }
          }
        },
        error: null
      };
    }
  };

  storage = {
    listBuckets: async () => {
      return { data: [], error: null };
    },

    createBucket: async (name: string, options?: any) => {
      return { data: { name }, error: null };
    },

    createSignedUrl: async (bucket: string, path: string) => {
      return { 
        data: { signedUrl: `/mock-storage/${bucket}/${path}` }, 
        error: null 
      };
    }
  };
}

export const supabase = new MockSupabaseClient();