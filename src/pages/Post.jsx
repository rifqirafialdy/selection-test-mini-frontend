import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchPost } from '../features/contents/contentSlice'
import UserPost from '../components/UserPost'
import CommentCard from '../components/CommentCard'

function Post() {
    const dispatch = useDispatch()
    const postList = useSelector(state => state.contents.post)
    const commentList = useSelector(state => state.contents.comments)
    const { id } = useParams()
    

    const renderComment = () => {
        return commentList.map((comment) => {
            return <CommentCard comment={comment}/>
        })
    }

    
    useEffect(() => {
        dispatch(fetchPost(id))
    }, [id])

    return (
      
      <div className=' flex  justify-center h-screen'>
            <div className='flex flex-col'>
                <UserPost postList={ postList} />
                <h1>COMMENTS:</h1>
                {renderComment()}
            </div>
    </div>
  )
}

export default Post