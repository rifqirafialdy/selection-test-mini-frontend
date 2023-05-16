import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Verification() {
    const { token } = useParams()
    const navigate = useNavigate()
    const [verificationResult, setVerificationResult]=useState(null)
    const tokenVerification = async () => {
        let response = await axios.post('http://localhost:8001/auth/verification', {}, {
            headers: {
            Authorization:`Bearer ${token}`
            
        }
        })
        if (response.data.message === 'Your Account has been Verified') {
            setVerificationResult(<div className='flex flex-col  items-center justify-center h-screen text-center gap-4 '>
            <h1 className=' text-7xl'>THANK'S FOR VERIFYING YOUR ACCOUNT</h1>
            <p className='text-2xl '>We are Going to Continue Our Journey By Login First</p>
            </div>)
            setTimeout(() => {
                navigate('/')
            },5000)
            
        } else if (response.data.message) {
            setVerificationResult(<div className='flex flex-col  items-center justify-center h-screen text-center gap-4 '>
            <h1 className=' text-7xl'>YOUR ACCOUNT ALREADY VERIFIED</h1>
            <p className='text-2xl '>We are Going to Continue Our Journey By Login First</p>
            </div>)
            setTimeout(() => {
                navigate('/')
            },5000)
            
        }else {
            setVerificationResult(<div className='flex flex-col  items-center justify-center h-screen text-center gap-4 '>
          
              
          <h1 className=' text-7xl'>YOUR LINK IS INVALID </h1>
          <p className='text-2xl '>Please Check Your Email and Use Latest Link</p>
    </div>)
        }
    }    
    useEffect(() => {
        tokenVerification()
        
    },[])
  return (
      <>
          {verificationResult}
      </>
  )
}

export default Verification