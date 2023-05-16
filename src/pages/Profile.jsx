import React, { useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import { useSelector } from 'react-redux'
import EditProfile from '../components/EditProfile'

function Profile() {
  const user = useSelector(state => state.users.user)
  const [isEdit, setIsEdit] = useState(false)
  const editBtnHandler = (edit) => {
    setIsEdit(edit)
  }

  return (
    <div className='flex justify-center h-screen'>
    <div className=' my-11'>

    <h1 className=' text-3xl text-blue-400'>PROFILE</h1>
    {isEdit? <EditProfile user={user} editBtn = {editBtnHandler} />
:<ProfileCard user={user} editBtn = {editBtnHandler} />
}
    
    </div>
  </div>  )
}

export default Profile