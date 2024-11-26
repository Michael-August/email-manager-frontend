"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Optional: for notifications
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://email-manager-baackend.onrender.com/api/login', {
                email,
                password,
            });

            // Handle success
            if (response.status === 200) {
                toast.success('Login successful!');
                console.log('Response:', response.data);
                localStorage.setItem("token", response?.data.token)
                localStorage.setItem("user", JSON.stringify(response?.data.userDetails))

                router.push('/dashboard')
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.log('Error:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-1/2 flex flex-col gap-5 p-6 mt-10 rounded-lg border">
            <span className="text-lg font-semibold">Log in</span>

            <form
                className="flex flex-col justify-center gap-3 items-center"
                onSubmit={handleSubmit}
            >
                <div className="form-group flex flex-col gap-3 w-full">
                    <label className="text-sm">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="p-2 rounded-md bg-transparent w-full border-2 border-gray-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group flex flex-col gap-2 w-full">
                    <label className="text-sm">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="********"
                        className="p-2 rounded-md bg-transparent w-full border-2 border-gray-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-black p-2 flex items-center justify-center mt-5 text-white rounded-lg hover:bg-gray-900"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
