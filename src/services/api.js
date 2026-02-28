import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth on 401
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Register
  register: async (email, password, name) => {
    const response = await apiClient.post('/auth/register', {
      email,
      password,
      name,
    });
    return response.data;
  },

  // Login
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: async () => {
    await apiClient.post('/auth/logout');
  },

  // Admin: Get all users
  getAllUsers: async () => {
    const response = await apiClient.get('/auth/users');
    return response.data;
  },

  // Admin: Get specific user
  getUserById: async (id) => {
    const response = await apiClient.get(`/auth/users/${id}`);
    return response.data;
  },

  // Admin: Update user
  updateUser: async (id, updates) => {
    const response = await apiClient.put(`/auth/users/${id}`, updates);
    return response.data;
  },

  // Admin: Delete user
  deleteUser: async (id) => {
    const response = await apiClient.delete(`/auth/users/${id}`);
    return response.data;
  },

  // Admin: Disable user
  disableUser: async (id) => {
    const response = await apiClient.patch(`/auth/users/${id}/disable`);
    return response.data;
  },

  // Admin: Enable user
  enableUser: async (id) => {
    const response = await apiClient.patch(`/auth/users/${id}/enable`);
    return response.data;
  },

  // Admin: Change user role
  changeUserRole: async (id, role) => {
    const response = await apiClient.patch(`/auth/users/${id}/role`, { role });
    return response.data;
  },
};

export default apiClient;
