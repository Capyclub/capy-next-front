'use client';
import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

interface User {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = () => {
            try {
                const token = Cookies.get('token');
                if (token) {
                    const decodedToken: any = jwtDecode(token);
                    const userData: User = {
                        id: decodedToken.sub,
                        email: decodedToken.email,
                        name: `${decodedToken.first_name} ${decodedToken.last_name}`,
                        isAdmin: decodedToken.isAdmin,
                    };
                    setUser(userData);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post<{ access_token: string }>(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                { email, password }
            );
            const token = response.data.access_token;
            const decodedToken: any = jwtDecode(token);
            const userData: User = {
                id: decodedToken.sub,
                email: decodedToken.email,
                name: `${decodedToken.first_name} ${decodedToken.last_name}`,
                isAdmin: decodedToken.isAdmin,
            };
            setUser(userData);
            Cookies.set('token', token, { expires: 7 }); // cookie expire in 7 days
            router.push("/admin");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
