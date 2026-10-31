'use client';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {


    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log('Email:', email);
        console.log('Password:', password);


        // Handle login logic here

        console.log('Login submitted');

    }


    return <div className='container mx-auto min-h-[80vh] flex items-center justify-center bg-gray-100'>
        <div className='p-4 bg-white rounded-xl'>
            <h2 className='text-3xl text-center font-bold'>Login to your account</h2>

            <form onSubmit={handleLogin} className='mt-4 space-y-4'>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email address</legend>
                    <input name="email" type="email" className="input" placeholder="Type your email" />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input name="password" type="password" className="input" placeholder="Type your password" />
                    <button className='btn btn-primary w-full mt-4'  >Login</button>
                </fieldset>
            </form>

            <p className=' mt-4 text-center text-sm text-gray-500'> Don't have an account? <Link href='/register' className='text-blue-500 hover:underline'>Register Here</Link></p>

        </div>

    </div>

};

export default LoginPage;