'use client'
import React from 'react'

export default function page({params}:any) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4">
    
    <h1>Profile page </h1>
    <h2 className='p-3 bg-green-500 rounded'>{params.id}</h2>
    </div>
  )
}

 