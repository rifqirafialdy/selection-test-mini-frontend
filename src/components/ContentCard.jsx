import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deletePost, editPost, fetchContent, postComment } from '../features/contents/contentSlice';
import { fetchUser } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';

function ContentCard({ content, user, deleteBtn, offset,likeBtnHandler }) {
    const [isEdit, setIsEdit] = useState(false)
    const [caption, setCaption] = useState('')
    const [liked, setLiked] = useState(false)
    const[comment,setComment]=useState('')

    const user_id = user?.userId
    const navigate= useNavigate()

    const date = new Date(content.created_at)
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const dateTime =
        date.getFullYear() + "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        ("00" + date.getDate()).slice(-2) + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
    const editBtnHandler = (token,id,offset,caption,value) => {
        dispatch(editPost(token,id,offset,caption))
        setIsEdit(value)
    }
    const openEdit = (value) => {
        setIsEdit(value)
    }
    const inputCaption = (e) => {
        setCaption(e.target.value)
    }
    const inputComment = (e) => {
        setComment(e.target.value)
    }
    const submitComment = (token,id,comment) => {
        dispatch(postComment(token, id, comment))
        setComment('')
    }

    useEffect(() => {
    },[user,content])
 
  
    return (
      <div>
            
    <div className="flex  rounded overflow-hidden shadow-lg px-3">
    <img className=" max-w-sm" src={`http://localhost:8001/content/${content.image}`} alt="Profile Picture"/>
    <div className="px-6 py-4">
    <h1 className="font-bold text-xl mb-2">{ content.user_name}</h1>
              <h1 className="font-bold text-xl mb-2">Likes : {content.likes} </h1>
              <button onClick={()=>likeBtnHandler(content.id_content,offset)} > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
</svg></button>
              {isEdit ?
                  <>
    <label for="caption"> Caption </label>
    <input type="text" id='caption'  className='border-2 border-black w-52 h-52  rounded-md' onChange={(e)=>inputCaption(e)} />
                  </>
            : <p className="text-gray-700 text-base">
        {content.caption}
      </p>}        
     
      
      <p className=' text-xs'>
        {dateTime}
      </p>
      {user_id == content.id_user?
      <div className='flex flex-col gap-2'>
                      
      <div className='flex  gap-3'>
        {isEdit?        <button className=' bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs' onClick={()=>editBtnHandler(token,content.id_content,{offset},caption,false)}>Save Changes</button>
        : <button className=' bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs' onClick={()=>openEdit(true)}>Edit Post</button>
}
        <button className=' bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs'onClick={()=>deleteBtn(token,content.id_content,{offset})}>Delete</button>
      </div> 
        <div>
        <button className=' bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs ' onClick={()=>navigate(`/post/${content.id_content}`)}>Details</button>
        </div>
              </div> : <>
              <button className=' bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs' onClick={()=>navigate(`/post/${content.id_content}`)}>Details</button>
</>}
   
          </div>

    
      </div>
      <div className=' flex m-3 gap-1'>
          <h1>COMMENT:</h1> 
          <input type="text" className=' border-2 rounded-md border-blue-400' onChange={(e)=>inputComment(e)} value={comment}/>   
          <button onClick={()=>submitComment(token,content.id_content,comment)}>submit</button>
      </div>
        </div>
  )
}

export default ContentCard