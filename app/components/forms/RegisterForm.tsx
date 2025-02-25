"use client" //QUESTION : Should be fixed ?

import { useState, useEffect } from "react";
import { isValidAge, isValidPostalCode, isValidName, isValidEmail } from '../../utils/module';


import Image from "next/image";
import RegisterFormData from "@/app/types/forms/registerFormData";
import RegisterFormError from "@/app/types/errors/registerFormError";
import { redirect } from "next/navigation";

function RegisterForm() {
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: '',
        lastName: '',
        city: '',
        postalCode: '',
        email: '',
        birthDate: new Date(Date.now()),
    });

    console.log(process.env.NODE_ENV);

    const [errors, setErrors] = useState<RegisterFormError>({});
    const [isFormReady, setIsFormReady] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const validateForm = () => {
        const newErrors: RegisterFormError = {};

        if (!isValidAge(formData.birthDate)) {
            newErrors.birthDate = 'You must be at least 18 years old.';
        }

        if (!isValidPostalCode(formData.postalCode)) {
            newErrors.postalCode = 'Postal code must be exactly 5 digits.';
        }

        if (!isValidName(formData.firstName)) {
            newErrors.firstName = 'First name must not contain special characters or numbers.';
        }
        if (!isValidName(formData.lastName)) {
            newErrors.lastName = 'Last name must not contain special characters or numbers.';
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
            formData.firstName &&
            formData.lastName &&
            formData.city &&
            formData.postalCode &&
            formData.email &&
            formData.birthDate
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            const existingData = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const newData = {
                ...formData,
                registrationDate: new Date().toISOString(),
            };
            localStorage.setItem('registeredUsers', JSON.stringify([...existingData, newData]));
            setFormData({
                firstName: '',
                lastName: '',
                city: '',
                postalCode: '',
                email: '',
                birthDate: new Date(Date.now()),
            });
            setErrors({});
            setIsSubmitted(true);
            //TODO: Add a spin animation for redirect
            setTimeout(() => {
                redirect('/admin');
            }, 2000);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (

        <div className="flex h-screen w-screen font-body">
            <div className={"w-3/6 h-full "}>
                <Image className={"w-full h-full object-cover"} width={1280} height={800} src={process.env.NODE_ENV === "production" ? "/capy-next-front/capybara.png" : "" + "/capybara.png"} alt="capybara" unoptimized={true}/>
            </div>
            <div className={"w-3/6 h-full flex justify-center items-center"}>
                <div className={"justify-center align-middle "}>
                    <h1 className="title">Capyclub subscription 2</h1>
                    {isSubmitted && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            Form submitted successfully!
                        </div>
                    )}

                    <form className="max-w-md mx-auto " onSubmit={handleSubmit}>
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
                            <label htmlFor="floating_email"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                                address</label>
                            {errors.email && <p data-testid="email-error" className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="firstName"
                                id="floating_first_name"
                                data-testid="first-name-input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <label htmlFor="floating_first_name"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First
                                Name</label>
                            {errors.firstName && <p  data-testid="first-name-error"  className="text-red-500 text-sm">{errors.firstName}</p>}
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="lastName"
                                id="floating_last_name"
                                data-testid="last-name-input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <label htmlFor="floating_last_name"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last
                                Name</label>
                            {errors.lastName && <p data-testid="last-name-error" className="text-red-500 text-sm">{errors.lastName}</p>}
                        </div>

                        {/* City */}
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
                            <label htmlFor="floating_city"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                            {errors.city && <p data-testid="city-error" className="text-red-500 text-sm">{errors.city}</p>}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="postalCode"
                                id="floating_postal_code"
                                data-testid="postal-code-input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.postalCode}
                                onChange={handleChange}
                            />
                            <label htmlFor="floating_postal_code"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Postal
                                Code</label>
                            {errors.postalCode && <p data-testid="postal-code-error" className="text-red-500 text-sm">{errors.postalCode}</p>}
                        </div>

                        {/* Birth Date */}
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="date"
                                name="birthDate"
                                id="floating_birth_date"
                                data-testid="birth-date-input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.birthDate.toString()}
                                onChange={handleChange}
                            />
                            <label htmlFor="floating_birth_date"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Birth
                                Date</label>
                            {errors.birthDate && <p data-testid="birth-date-error" className="text-red-500 text-sm">{errors.birthDate.toString()}</p>}
                        </div>

                        <button
                            type="submit"
                            data-testid="submit-button"
                            className={`text-black bg-[#FCD143] hover:bg-[#ffe696] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                    ${!isFormReady && 'opacity-50 cursor-not-allowed'}`}
                            disabled={!isFormReady}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;