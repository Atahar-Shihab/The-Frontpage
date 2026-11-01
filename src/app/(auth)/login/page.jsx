'use client';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';
const LoginPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const handleLogin = async (data) => {
        console.log(data);
        console.log(errors);

        const { data:res, error } = await authClient.signIn.email({
            email: data.email, // required, The email address of the user.
            password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
            rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
            callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
        });

        console.log(res, error);
    }

    return <div className='container mx-auto min-h-[80vh] flex items-center justify-center bg-gray-100'>
        <div className='p-4 bg-white rounded-xl'>
            <h2 className='text-3xl text-center font-bold'>Login to your account</h2>

            <form onSubmit={handleSubmit(handleLogin)} className='mt-4 space-y-4'>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email address</legend>
                    <input
                        {...register("email", { required: "Email is required" })} type="email" className="input" placeholder="Type your email" />
                    <p className="text-red-500">{errors.email?.message}</p>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input {...register("password", { required: "Password is required" })} type="password" className="input" placeholder="Type your password" />
                    <p className="text-red-500">{errors.password?.message}</p>
                    <button className='btn btn-primary w-full mt-4'  >Login</button>
                </fieldset>
            </form>

            <p className=' mt-4 text-center text-sm text-gray-500'> Don&apos;t have an account? <Link href='/register' className='text-blue-500 hover:underline'>Register Here</Link></p>

        </div>

    </div>

};

export default LoginPage;