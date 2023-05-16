import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editUser } from '../features/users/userSlice'

function EditProfile({ user,editBtn }) {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [bio, setBio] = useState('')
    const [file, setFile] = useState(null)
    const onFileChange = (e) => {
        setFile(e.target.files[0])
        let preview = document.getElementById('image-preview')
      preview.src = URL.createObjectURL(e.target.files[0])
      console.log(file);
      
    }
    const inputUsername = (e) => {
        setUsername(e.target.value)
    }
    const inputFullname = (e) => {
        setFullname(e.target.value)
    }
    const inputBio = (e) => {
        setBio(e.target.value)
    }
    const userData = {
        image: file,
        username: username,
        fullname: fullname,
        bio:bio
    }
    const saveChange = (userProfile) => {
        const token = localStorage.getItem('token')
        dispatch(editUser(token, userProfile))
        editBtn(false)

    }
  return (
<div class="flex  rounded overflow-hidden shadow-lg">
    <img class="w-full" id='image-preview' src={`http://localhost:8001/users/${user.pic}`} />
    <div class="px-6 py-4 flex flex-col">
    <label
    for="formFile"
    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
    >Profile Picture</label>
  <input
    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
    type="file"
    id="formFile"
    onChange={(e)=>{
    onFileChange(e)
    }} />  
    <label for="username"> Username </label>
          <input type="text" id='Username' placeholder={user.username} className='border-2 border-black  rounded-md' onChange={(e)=>inputUsername(e)} />
    <label for="fullname"> fullname </label>
          <input type="text" id='fullname' placeholder={user.fullname} className='border-2 border-black  rounded-md' onChange={(e)=>inputFullname(e)} />
    <label for="bio"> Bio </label>
          <input type="text" id='bio' placeholder={user.bio} className='border-2 border-black w-full h-24 rounded-md' onChange={(e)=>inputBio(e)}/>

          <h1 className='font-bold text-xl mb-2'> Email : {user.email}</h1>
    <div>
        <button className=' bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>saveChange(userData)}>Save Change</button>
    </div>
    </div>
    
    </div>  )
}

export default EditProfile