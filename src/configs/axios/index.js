import Axios from 'axios';
import router from '@/router/index.js';
import { useAuthStore } from '@/stores/user/auth.js';

export const axios = Axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const authStore = useAuthStore();

            authStore.logout();

            axios.defaults.headers.common['Authorization'] = 'Bearer';

            router.push({ name: 'login' });
        }

        return Promise.reject(error);
    },
);

axios.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem('auth_token');

        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        console.log('error: ', error);
        return Promise.reject(error);
    },
);
