import axios from 'axios'
import React, { useState } from 'react'

function ForgotPassword() {
    const [email,setEmail]=useState('')
    const emailHandler = (e) => {
        setEmail(e.target.value)    
    }
    const forgotPassHandler = async (email) => {
        let response = await axios.post('http://localhost:8001/auth/request-reset', { email })
        alert(response.data.message)
    }
  return (
    <div className='grid h-screen place-items-center'>
        <div className='flex flex-col border-2 border-blue-400 rounded-md p-14 shadow-xl gap-3'>
          <h1 className=' text-xl text-blue-400 text-center'>Reset Password Request</h1>
        <div className='flex flex-col'>
        <label for="email"> Email </label>
          <input type="text" id='email' placeholder='Email' className='border-2 border-black' onChange={(e)=>emailHandler(e)} />
        </div>
          <button className=' bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>forgotPassHandler(email)}>Request</button>
      </div>
    </div>
  )
}

export default ForgotPassword