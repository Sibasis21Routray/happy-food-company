const API_URL = import.meta.env.VITE_API_URL ;

export const api = {
  products: {
    getAll: async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        return data.products || [];
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
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Login failed');
        }
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
  },
  cart: {
    get: async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/cart`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch cart');
      }
      return await response.json();
    },
    add: async (productId: string, quantity = 1) => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ productId, quantity })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add to cart');
      }
      return await response.json();
    },
    remove: async (productId: string) => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to remove from cart');
      }
      return await response.json();
    }
  },
  wishlist: {
    get: async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/wishlist`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch wishlist');
      }
      return await response.json();
    },
    add: async (productId: string) => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/wishlist/add`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ productId })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add to wishlist');
      }
      return await response.json();
    },
    remove: async (productId: string) => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/wishlist/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to remove from wishlist');
      }
      return await response.json();
    }
  },
  addresses: {
    getAll: async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/addresses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch addresses');
      }
      return await response.json();
    },
    create: async (addressData: any) => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/addresses`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(addressData)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create address');
      }
      return await response.json();
    }
  },
  orders: {
    getAll: async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/order`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch orders');
      }
      return await response.json();
    },
    getById: async (id: string) => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/order/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch order details');
      }
      return await response.json();
    }
  },
  coupons: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/coupon`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch coupons');
      }
      return await response.json();
    }
  }
};
