// src/services/api.ts
import axios from 'axios';

const API_BASE_URL =
    'https://your-api.com/api';

// ساخت اینستنس اصلی Axios
export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// توکن را به همه درخواست‌ها اضافه می‌کند
export function setAuthToken(token?: string) {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
}

// اینترسپتور برای مدیریت خطا
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // می‌توانیم اینجا log یا toast کنیم
        const message =
            error.response?.data?.message || error.message || 'UNKNOWN_ERROR';
        return Promise.reject(new Error(message));
    }
);
