// src/services/authApi.ts
import { api } from './api';

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),

  getProfile: () => api.get('/auth/profile'),
};
