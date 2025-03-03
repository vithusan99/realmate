import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser } = useSelector((state)=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.userImg} alt="profile" className='w-20 h-20 rounded-full cursor-pointer mt-2 self-center object-cover' />
        <input id='username' type="text" placeholder='Username' className='border p-3 rounded-lg'/>
        <input id='email' type="email" placeholder='Email' className='border p-3 rounded-lg'/>
        <input id='password' type="password" placeholder='Password' className='border p-3 rounded-lg'/>
        <button className='text-white bg-slate-800 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
