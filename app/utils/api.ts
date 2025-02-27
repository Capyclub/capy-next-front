import axios from 'axios';
import Cookies from 'js-cookie';
import User from '@/app/types/forms/UserData';

/**
 * Create an Axios instance with default configuration
 */
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);




/**
 * Fetch all users from the API (User must have a valid token)
 *
 * @returns {Promise<User[]>} List of users
 */
export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get<User[]>('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users.');
    }
};

/**
 * Create a new user in the API (User must have a valid token)
 *
 * @param {RegisterFormData} userData - User data
 * @returns {Promise<User>} The created user
 */
export const createUser = async (userData: {
    city: string;
    date_of_birth: string;
    last_name: string;
    postal_code: string;
    first_name: string;
    email: string
}): Promise<User> => {
    try {
        const response = await api.post<User>('/users', userData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create user.');
    }
};

export default api;
