'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
const RegisterPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const [isShowingPassword, setIsShowingPassword] = useState(false);

    const handleRegister = async (data) => {
                        const { name, photoUrl, email, password } = data;

        const {data: res, error} = await authClient.signUp.email({
            name: name, // required, The name of the user.
            email: email, // required, The email address of the user.
            password: password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
            image: photoUrl, // An optional profile image of the user.
            callbackURL: "/", // An optional URL to redirect to after the user signs up.
        });
        console.log(res, error)

        if (error) {
            toast.error(error?.message || "An error occurred during registration. Please try again.");
        } else {
            toast.success("Registration successful! Please check your email to verify your account.");
        }

    }


    return <div className='container mx-auto min-h-[80vh] flex items-center justify-center bg-gray-100'>
        <div className='p-4 bg-white rounded-xl'>
            <h2 className='text-3xl text-center font-bold'>Register for an account</h2>

            <form onSubmit={handleSubmit(handleRegister)} className='mt-4 space-y-4'>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Name</legend>
                    <input
                        {...register("name", { required: "Name is required" })} type="text" className="input" placeholder="Type your name" />
                    <p className="text-red-500">{errors.name?.message}</p>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">photo url</legend>
                    <input
                        {...register("photoUrl")} type="text" className="input" placeholder="Type your photo url" />
                    <p className="text-red-500">{errors.photoUrl?.message}</p>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email address</legend>
                    <input
                        {...register("email", { required: "Email is required" })} type="email" className="input" placeholder="Type your email" />
                    <p className="text-red-500">{errors.email?.message}</p>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input {...register("password", { required: "Password is required" })} type={isShowingPassword ? "text" : "password"} className="input" placeholder="Type your password" />
                    <p className="text-red-500">{errors.password?.message}</p>
                    <button type="button" className="text-sm text-blue-500 hover:underline" onClick={() => setIsShowingPassword(!isShowingPassword)}>
                        {isShowingPassword ? "Hide" : "Show"} Password
                    </button>
                    <button className='btn btn-primary w-full mt-4'  >Register</button>
                </fieldset>
            </form>

        </div>

    </div>

};

export default RegisterPage;