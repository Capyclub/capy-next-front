"use client";

import { useState, useEffect } from "react";
import { isValidAge, isValidPostalCode, isValidName, isValidEmail } from '../../utils/module';
import Image from "next/image";
import RegisterFormData from "@/app/types/forms/registerFormData";
import RegisterFormError from "@/app/types/errors/registerFormError";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { createUser } from "@/app/utils/api";

function RegisterForm() {
    const [formData, setFormData] = useState<RegisterFormData>({
        first_name: '',
        last_name: '',
        city: '',
        postal_code: '',
        email: '',
        date_of_birth: new Date(),
    });
    const { user, loading, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const checkUserStatus = () => {
            if (user) {
                router.push('/admin');
            }
        };

        const timer = setTimeout(checkUserStatus, 4000);

        return () => clearTimeout(timer);
    }, [loading, user, router]);

    const [errors, setErrors] = useState<RegisterFormError>({});
    const [isFormReady, setIsFormReady] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors: RegisterFormError = {};

        if (!isValidAge(formData.date_of_birth)) {
            newErrors.date_of_birth = 'You must be at least 18 years old.';
        }

        if (!isValidPostalCode(formData.postal_code)) {
            newErrors.postal_code = 'Postal code must be exactly 5 digits.';
        }

        if (!isValidName(formData.first_name)) {
            newErrors.first_name = 'First name must not contain special characters or numbers.';
        }
        if (!isValidName(formData.last_name)) {
            newErrors.last_name = 'Last name must not contain special characters or numbers.';
        }

        if (!isValidName(formData.city)) {
            newErrors.city = 'City name must not contain special characters or numbers.';
        }

        if (!isValidEmail(formData.email)) {
            newErrors.email = 'Email is not valid.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (
            formData.first_name &&
            formData.last_name &&
            formData.city &&
            formData.postal_code &&
            formData.email &&
            formData.date_of_birth
        ) {
            setIsFormReady(true);
        } else {
            setIsFormReady(false);
        }
    }, [formData]);

    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                setIsSubmitted(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await createUser({
                    ...formData,
                    date_of_birth: formData.date_of_birth.toString(),
                });

                const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
                registeredUsers.push(formData);
                localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));



                setFormData({
                    first_name: '',
                    last_name: '',
                    city: '',
                    postal_code: '',
                    email: '',
                    date_of_birth: new Date(),
                });
                setErrors({});
                setIsSubmitted(true);

                setTimeout(() => {
                    //@Todo : Check if we need to add a password field
                    login(formData.email, 'defaultPassword123');
                    router.push('/admin');
                }, 3000);
            } catch (error) {
                console.error("Error creating user:", error);
                // Handle error (e.g., show error message to the user)
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "date_of_birth") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: new Date(value),
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    return (
        <div className="flex h-screen w-screen font-body">
            <div className="w-3/6 h-full">
                <Image
                    className="w-full h-full object-cover"
                    width={1280}
                    height={800}
                    src={process.env.NODE_ENV === "production" ? "/capy-next-front/capybara.png" : "/capybara.png"}
                    alt="capybara"
                    unoptimized={true}
                />
            </div>
            <div className="w-3/6 h-full flex justify-center items-center">
                <div className="justify-center align-middle">
                    <h1 className="title">Capyclub subscription 2</h1>
                    {isSubmitted && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            Form submitted successfully!
                        </div>
                    )}
                    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="email"
                                name="email"
                                id="floating_email"
                                data-testid="email-input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email address
                            </label>
                            {errors.email && <p data-testid="email-error" className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="first_name"
                                id="floating_first_name"
                                data-testid="first-name-input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                First Name
                            </label>
                            {errors.first_name && <p data-testid="first-name-error" className="text-red-500 text-sm">{errors.first_name}</p>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="last_name"
                                id="floating_last_name"
                                data-testid="last-name-input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Last Name
                            </label>
                            {errors.last_name && <p data-testid="last-name-error" className="text-red-500 text-sm">{errors.last_name}</p>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="city"
                                id="floating_city"
                                data-testid="city-input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.city}
                                onChange={handleChange}
                            />
                            <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                City
                            </label>
                            {errors.city && <p data-testid="city-error" className="text-red-500 text-sm">{errors.city}</p>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="postal_code"
                                id="floating_postal_code"
                                data-testid="postal-code-input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.postal_code}
                                onChange={handleChange}
                            />
                            <label htmlFor="floating_postal_code" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Postal Code
                            </label>
                            {errors.postal_code && <p data-testid="postal-code-error" className="text-red-500 text-sm">{errors.postal_code}</p>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="date"
                                name="date_of_birth"
                                id="floating_birth_date"
                                data-testid="birth-date-input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={!isNaN(formData.date_of_birth.getTime()) ? formData.date_of_birth.toISOString().split('T')[0] : ''}
                                onChange={handleChange}
                            />
                            <label htmlFor="floating_birth_date" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Birth Date
                            </label>
                            {errors.date_of_birth && <p data-testid="birth-date-error" className="text-red-500 text-sm">{errors.date_of_birth.toString()}</p>}
                        </div>
                        <button
                            type="submit"
                            data-testid="submit-button"
                            className={`text-black bg-[#FCD143] hover:bg-[#ffe696] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${!isFormReady && 'opacity-50 cursor-not-allowed'}`}
                            disabled={!isFormReady}
                        >
                            Submit
                        </button>
                    </form>
                    <div className="mt-6">
                        <p className="text-center text-bold">Already registered?</p>
                        <div className="w-full flex justify-center">
                            <Link className="text-[#FCD143] underline text-center w-full" href="/login">Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
