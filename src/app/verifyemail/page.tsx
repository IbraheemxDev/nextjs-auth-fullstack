'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { useRouter } from 'next/router'
import { set } from 'mongoose'


export default function VerifyEmailPage() {
    // const router=userRouter()
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios("/api/users/verifyemail", { token })
            setVerified(true)
            setError(false)
        } catch (error: any) {
            setError(true)
        }
    }
    useEffect(() => {
        setError(false)
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

        // ye nextjs approach ha 
        // const {query}=router
        // const urlTokenTwo=query.token


    }, [])
    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='text-4xl'>Verify Email</h1>
            <h2 className='p-2 bg-orange-500 text-black'>
                {token?`${token}`:"no token"}
            </h2>
            {verified && (
                <div>
                    <h2>Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error</h2>
                    
                </div>
            )}
        </div>
    )
}
