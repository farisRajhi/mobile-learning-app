import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../services/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

axiosInstance.interceptors.request.use(
    config => async () => {
        const token = await AsyncStorage.getItem('access');
        if (token) {
            config.headers['Authorization'] = `JWT ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const refreshToken = await AsyncStorage.getItem('refresh');
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data?.code === 'token_not_valid' &&
            refreshToken &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const res = await axiosInstance.post('/auth/jwt/refresh/', { refresh: refreshToken });
                await AsyncStorage.setItem('access', res.data.access);
                axiosInstance.defaults.headers['Authorization'] = `JWT ${res.data.access}`;
                originalRequest.headers['Authorization'] = `JWT ${res.data.access}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                store.dispatch({ type: LOGOUT });
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;