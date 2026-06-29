'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("login successfull", response.data)
            router.push('/profile')
        } catch (error: any) {
            console.log("Login failed")
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4">
            <div className="w-full max-w-sm bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/40 border border-slate-800 p-8">
                <h1 className="text-2xl font-semibold text-slate-100 text-center">
                    {loading ? "Processing..." : "Welcome back"}
                </h1>
                <p className="text-sm text-slate-400 text-center mt-1 mb-6">
                    Log in to your account
                </p>

                <div className="flex flex-col gap-4">
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
                        onClick={onLogin}
                        disabled={buttonDisabled || loading}
                        className="mt-2 p-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition"
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </div>

                <p className="text-sm text-slate-400 text-center mt-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-indigo-400 font-medium hover:underline hover:text-indigo-300">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}