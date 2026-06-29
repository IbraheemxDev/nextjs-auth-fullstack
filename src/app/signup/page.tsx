'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("signup successfull", response.data)
            router.push('/login')
        } catch (error: any) {
            console.log("Signup failed")
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4">
            <div className="w-full max-w-sm bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/40 border border-slate-800 p-8">
                <h1 className="text-2xl font-semibold text-slate-100 text-center">
                    {loading ? "Processing..." : "Create account"}
                </h1>
                <p className="text-sm text-slate-400 text-center mt-1 mb-6">
                    Sign up to get started
                </p>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="text-sm font-medium text-slate-300">
                            Username
                        </label>
                        <input
                            className="px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="yourusername"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium text-slate-300">
                            Email
                        </label>
                        <input
                            className="px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm font-medium text-slate-300">
                            Password
                        </label>
                        <input
                            className="px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        onClick={onSignup}
                        disabled={buttonDisabled || loading}
                        className="mt-2 p-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition"
                    >
                        {loading ? "Signing up..." : "Sign up"}
                    </button>
                </div>

                <p className="text-sm text-slate-400 text-center mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-indigo-400 font-medium hover:underline hover:text-indigo-300">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    )
}