import Axios from 'axios';

export const axios = Axios.create({
    baseURL: 'http://localhost/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

axios.interceptors.request.use(
    (config) => {
        const authToken = JSON.parse(localStorage.getItem('auth_token'));

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
