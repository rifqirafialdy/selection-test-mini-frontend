import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProfileCard({user, editBtn}) {
const navigate = useNavigate()
const requestVerify = async () => {
    const token = localStorage.getItem('token')
    let response = await axios.post(`http://localhost:8001/auth/request-token`,{}, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    alert(response.data.message)
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload(true)

    
}
console.log(user);
    return (
  <>
    {user.isVerify? <div class="flex  rounded overflow-hidden shadow-lg">
    <img class="w-full" src={`http://localhost:8001/users/${user.pic}`} alt="Profile Picture"/>
    <div class="px-6 py-4">
    <h1 class="font-bold text-xl mb-2">{ user.username}</h1>
    <h1 class="font-bold text-xl mb-2">{ user.fullname}</h1>
    <p>Bio :</p>
      <p class="text-gray-700 text-base">
        {user.bio}
      </p>
          <h1 className='font-bold text-xl mb-2'> Email : {user.email}</h1>
    <div>
        <button className=' bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>editBtn(true)}>Edit Profile</button>
    </div>
    </div>
    
    </div> :  <div class="  flex  rounded overflow-hidden shadow-lg">
    <img class=" w-60 opacity-10 " src={`http://localhost:8001/users/${user.pic}`} alt="Profile Picture"/>
    <div class="px-6 py-4 opacity-10">
    <h1 class="font-bold text-xl mb-2">{ user.username}</h1>
    <h1 class="font-bold text-xl mb-2">{ user.fullname}</h1>
    <p>Bio :</p>
      <p class="text-gray-700 text-base">
        {user.bio}
      </p>
          <h1 className='font-bold text-xl mb-2'> Email : {user.email}</h1>
    </div>
    
    <div>
        <button className=' bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>requestVerify()}>Request Verification</button>
    </div>
  </div>}
    </>
   
  )
}

export default ProfileCard