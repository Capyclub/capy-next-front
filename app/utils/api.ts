import axios from 'axios';
import Cookies from 'js-cookie';
import User from '@/app/types/forms/UserData';

// Create an instance of axios to use on all the app
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get<User[]>('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (userData: User): Promise<User> => {
    try {
        const response = await api.post<User>('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export default api;
