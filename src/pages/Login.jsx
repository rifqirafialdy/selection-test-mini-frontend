import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false)
    const navigate= useNavigate()
    const inputEorUHandler = (e) => {
            
            setEmail(e.target.value)
            setUserName(e.target.value)    
        
    }
    const passwordHandeler = (e) => {
        setPassword(e.target.value)
    }
    const inputBtnHandler = async (email, username,password) => {
        if (email.includes('@')) {
           let response = await axios.post('http://localhost:8001/auth/login', { email, password })
           if (response.data.message == 'Login Succes') {
            alert("Login berhasil")
            localStorage.setItem('token',response.data.token)
            navigate('/home')
            window.location.reload(true)
        } else {
          alert(response.data.message)
        }            
        } else {
            let response = await axios.post('http://localhost:8001/auth/login', { username, password })
            if (response.data.message == 'Login Succes') {
                alert("Login berhasil")
                localStorage.setItem('token',response.data.token)
                navigate('/home')
            } else {
              alert(response.data.message)
            }        }
    }
    const openPass = () => {
        setOpen(!open)
    }
    return (
        <div className='grid h-screen place-items-center'>

        <div className='flex flex-col border-2 border-blue-400 rounded-md p-14 shadow-xl gap-3'>
            <h1 className=' text-2xl text-blue-400 text-center'>LOG IN</h1>
            <div className='flex flex-col'>
                
            <label for='usernameEmail'>Email or Username</label>
            <input id='usernameEmail' type="text" placeholder='Email or Username' onChange={(e) => inputEorUHandler(e)} />
            </div>
            <div> 
            <label for='password'>Password</label>
            <div>  
            <input id='password' type={open ? "text" : "password"} onChange={(e) => passwordHandeler(e)} />
            <button onClick={()=>openPass()}>{open ? "Hide" : "Show"}</button>
            </div>
            </div>

            <div className=' flex flex-col' >
                
            <button className=' border-2 bg-blue-400 rounded-xl' onClick={() => inputBtnHandler(email, username, password)}>Log in</button>
            <button onClick={()=>navigate('/forgot-password')}>Forgot Password?</button>
            <div className='flex'>
                <p>Didn't Had Account?</p>
                <button className=' text-blue-400' onClick={()=>navigate('/register')}>Register</button>
            </div>
            </div>
        </div>
      </div>
     )
}

export default Login