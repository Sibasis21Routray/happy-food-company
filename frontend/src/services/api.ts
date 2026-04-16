const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  products: {
    getAll: async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        return [];
      }
    }
  },
  auth: {
    login: async (credentials: any) => {
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        if (!response.ok) throw new Error('Login failed');
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    register: async (userData: any) => {
      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Registration failed');
        }
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    updateProfile: async (userData: any) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/auth/profile`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(userData)
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Update failed');
        }
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
  }
};
