import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../features/users/userSlice'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload(true)
  }
  
  useEffect(() => {

  },[])
  return (
    <div className='bg-white text-gray-600 shadow-xl h-screen overflow-hidden  w-60 fixed'>
      <div className=' flex flex-col gap-3 text-3xl text-center py-10'>
        <button className='hover:text-blue-400' onClick={()=> navigate('/home')}>Home</button>
        <button className=' hover:text-blue-400' onClick={()=>navigate('/profile')}>Profile</button>
        <button className=' hover:text-blue-400' onClick={()=>logoutHandler()}>Log Out</button>
      </div>
</div>  )
}

export default Sidebar