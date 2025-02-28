'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { fetchUsers } from '../utils/api';
import User from '../types/forms/UserData';

export default function AdminTable() {
    const [users, setUsers] = useState<User[]>([]);
    const { user, loading, logout, setLoading } = useAuth();
    const router = useRouter();



    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!user) {
            router.push('/');
        } else if (user) {
            loadUsers();
            console.log('user', user);
        }
    }, [loading, user, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="m-4 md:m-16">
            <button onClick={logout} className="mt-4 underline text-red-500">
                Se déconnecter et revenir au bureau
            </button>
            <h1 className="title text-left text-2xl font-bold mb-4">CapyClub admin</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead>
                    <tr className="text-gray-600 uppercase text-sm leading-normal bg-gray-100">
                        <th className="py-2 px-4 md:px-6 text-left border-b border-gray-200 font-medium">
                            Nom
                        </th>
                        <th className="py-2 px-4 md:px-6 text-left border-b border-gray-200 font-medium">
                            Mail
                        </th>
                        <th className="py-2 px-4 md:px-6 text-left border-b border-gray-200 font-medium">
                            City
                        </th>
                        <th className="py-2 px-4 md:px-6 text-left border-b border-gray-200 font-medium">
                            Postal code
                        </th>
                        <th className="py-2 px-4 md:px-6 text-left border-b border-gray-200 font-medium">
                            Birth date
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.email}
                            className="hover:bg-gray-50 even:bg-gray-50 odd:bg-white text-gray-900"
                        >
                            <td className="py-2 px-4 md:px-6 border-b border-gray-200">
                                {user.first_name} {user.last_name}
                            </td>
                            <td className="py-2 px-4 md:px-6 border-b border-gray-200">
                                {user.email}
                            </td>
                            <td className="py-2 px-4 md:px-6 border-b border-gray-200">
                                {user.city}
                            </td>
                            <td className="py-2 px-4 md:px-6 border-b border-gray-200">
                                {user.postal_code}
                            </td>
                            <td className="py-2 px-4 md:px-6 border-b border-gray-200">
                                {user.date_of_birth}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
