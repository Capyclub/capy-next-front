import axios from 'axios';
import Cookies from 'js-cookie';

// Créez une instance d'axios avec une configuration de base
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Assurez-vous que cette variable d'environnement est définie
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


export const fetchUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (userData: any) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


export default api;
