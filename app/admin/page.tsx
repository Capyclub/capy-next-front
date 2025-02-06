import Link from "next/link";

export default function AdminPage() {
    const users = [
        { name: "Alice", email: "alice@gmail.com", city: "New York", postalCode: "10001", birthDate: "1990-05-15" },
        { name: "Bob", email: "bob@gmail.com", city: "Los Angeles", postalCode: "90001", birthDate: "1985-03-22" },
        { name: "Charlie", email: "charlie@gmail.com", city: "Chicago", postalCode: "60601", birthDate: "1992-07-10" },
        { name: "Diana", email: "diana@gmail.com", city: "Houston", postalCode: "77001", birthDate: "1988-11-05" },
        { name: "Eve", email: "eve@gmail.com", city: "Phoenix", postalCode: "85001", birthDate: "1995-09-18" },
        { name: "Frank", email: "frank@gmail.com", city: "Philadelphia", postalCode: "19101", birthDate: "1980-01-30" },
        { name: "Grace", email: "grace@gmail.com", city: "San Antonio", postalCode: "78201", birthDate: "1993-06-12" },
        { name: "Henry", email: "henry@gmail.com", city: "San Diego", postalCode: "92101", birthDate: "1989-04-27" },
        { name: "Ivy", email: "ivy@gmail.com", city: "Dallas", postalCode: "75201", birthDate: "1994-12-02" },
        { name: "Jack", email: "jack@gmail.com", city: "San Jose", postalCode: "95101", birthDate: "1991-08-14" },
    ];

    return (
        <div className="m-4 md:m-16">
            <Link className="underline" href="/">
                Retourner à l&apos;accueil
            </Link>
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
                                    {user.name}
                                </td>
                                <td className="py-2 px-4 md:px-6 border-b border-gray-200">
                                    {user.email}
                                </td>
                                <td className="py-2 px-4 md:px-6 border-b border-gray-200">
                                    {user.city}
                                </td>
                                <td className="py-2 px-4 md:px-6 border-b border-gray-200">
                                    {user.postalCode}
                                </td>
                                <td className="py-2 px-4 md:px-6 border-b border-gray-200">
                                    {user.birthDate}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}