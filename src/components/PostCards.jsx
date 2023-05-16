import React from 'react'
import { useSelector } from 'react-redux'

function PostCards() {
    const postList = useSelector(state => state.contents.post)
    const post = postList?.[0]

    return (
        <>
    {post === undefined? <p>Loading....</p>     
    :  <div className=' my-11'>
              
    <div class="flex  rounded overflow-hidden shadow-lg">
<img class=" max-w-sm" src={`http://localhost:8001/content/${post.image}`} alt="Profile Picture"/>
<div class="px-6 py-4">
<h1 class="font-bold text-xl mb-2">{post.user_name}</h1>
<h1 class="font-bold text-xl mb-2">{post.caption}</h1>
<p>Likes:</p>
<p class="text-gray-700 text-base">
  {post.likes}
</p>
    <h1 className='font-bold text-xl mb-2'> {post.created_at}</h1>
<div>
</div>
</div>

</div>          </div>}
        </>
  )
}

export default PostCards