import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../features/users/userSlice'
import AddContent from '../components/AddContent'
import { deletePost, fetchContent, fetchMoreContent, likePost } from '../features/contents/contentSlice'
import ContentCard from '../components/ContentCard'

function Home() {
  const dispatch = useDispatch()
  const contents = useSelector(state=>state.contents.contentList)
  const user = useSelector(state => state.users.user)
  const [isAddContent, setIsAddContent] = useState(false)
  const token = localStorage.getItem('token')
  const shouldLog = useRef(true)
  let offset = 0
  const renderPost = () => {
    return contents.map((content) => {
      return <ContentCard content={content} user={user } offset={offset} deleteBtn={deleteHandler} likeBtnHandler={likeBtnHandler}  />
    })
  }
  const deleteHandler = (token, id,offset) => {
    dispatch(deletePost(token, id, offset))
    
  }
  const likeBtnHandler = (token, id, offset) => {
    offset=0
    dispatch(likePost(token, id, offset))
  }



  const addBtnHandler = (value) => {
    offset = 0
    setIsAddContent(value)
  }
  const handleScroll = (e) => {
    if (e.target.documentElement.scrollTop + window.innerHeight + 1 >= e.target.documentElement.scrollHeight) {
      offset+=5
      dispatch(fetchMoreContent(offset))
    }
  }

  useEffect(() => {
    
    if (shouldLog.current) {
      shouldLog.current= false
      dispatch(fetchContent(offset))
      
      window.addEventListener('scroll', handleScroll)
    }
;  }, [])
  if (!user.isVerify) {
    return (
      <div className='flex justify-center h-screen '>
        <div>

        <p>Your Account Not Verified, Please Verified it in Profile section</p>
        </div>
        </div>
    )
  
    
  }
  
  return (
    <div className='flex justify-center h-screen'>
      <div className=' my-11'>

        <h1 className=' text-3xl text-blue-400'>HOME</h1>
        {isAddContent ? <AddContent addBtn={addBtnHandler} offset={offset}/> :
          <>
          <button onClick={() => addBtnHandler(true)}>Add Content</button>
          {renderPost()}
          </>
        }
        
      </div>
    </div>
  )
}

export default Home