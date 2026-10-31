'use client';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

const RegisterPage = () => {

    const {register, handleSubmit,watch, formState: { errors }} = useForm()

    const handleRegister = (data) => {
const { name, photoUrl, email, password } = data;
console.log("name: ", name);
console.log("photoUrl: ", photoUrl);
console.log("email: ", email);
console.log("password: ", password);
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
                    <input {...register("password", { required: "Password is required" })} type="password" className="input" placeholder="Type your password" />
                    <p className="text-red-500">{errors.password?.message}</p>
                    <button className='btn btn-primary w-full mt-4'  >Register</button>
                </fieldset>
            </form>

        </div>

    </div>

};

export default RegisterPage;