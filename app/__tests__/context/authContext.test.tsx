import {render, waitFor, act, renderHook} from "@testing-library/react";
import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('js-cookie', () => ({
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
}));

jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn(() => ({
        sub: "1",
        email: "test@example.com",
        first_name: "Test",
        last_name: "User",
        isAdmin: false,
    })),
}));

describe("AuthContext", () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });
    });

    it("should initialize with user as null and loading as true", async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

        await waitFor(() => {
            expect(result.current.user).toBeNull();
            expect(result.current.loading).toBe(true);
        });
    });

    it("should set user data on successful login", async () => {
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImZpcnN0X25hbWUiOiJUZXN0IiwibGFzdF9uYW1lIjoiVXNlciJ9.CjZcbNnKSLXnXNEPbsb6h_qeFlkI9FptDbYYNjTeL6o';
        const mockUser = {
            id: "1",
            email: "test@example.com",
            name: "Test User",
            isAdmin: false,
        };

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

        await act(async () => {
            await result.current.login("test@example.com", "password");
        });
        expect(result.current.user).toEqual(mockUser);
        expect(Cookies.set).toHaveBeenCalledWith('token', mockToken, { expires: 7 });
    });


    it("should remove user data on logout", async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

        act(() => {
            result.current.logout();
        });

        expect(Cookies.remove).toHaveBeenCalledWith('token');
        expect(result.current.user).toBeNull();
        expect(useRouter().push).toHaveBeenCalledWith("/login");
    });

    it("should handle login error", async () => {
        fetchMock.mockRejectOnce(new Error("Login error"));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

        try {
            await act(async () => {
                await result.current.login("test@example.com", "password");
            });
        } catch (error) {
            console.log("Error caught in test:", error);
            expect(error).toHaveProperty('message', "Login error");
        }
    });

});

const TestComponent = () => {
    const { login, logout } = useAuth();

    return (
        <div>
            <button onClick={() => login("test@example.com", "password")}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};
