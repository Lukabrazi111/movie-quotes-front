import { defineStore } from 'pinia';
import { axios } from '@/configs/axios/index.js';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('auth_token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
    }),

    getters: {
        isAuthenticated: (state) => !!state?.token,
    },

    actions: {
        async fetchUser() {
            try {
                const response = await axios.get('/user');

                if (response?.status === 200) {
                    this.user = response.data;
                }
            } catch (error) {
                const response = error.response;
                if (response.status === 401) {
                    this.logout();
                }
            }
        },

        setUser(user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },

        setToken(token) {
            this.token = token;
            localStorage.setItem('auth_token', token);
        },

        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
        },
    },
});
