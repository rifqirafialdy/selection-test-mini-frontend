import React from 'react'

function CommentCard({comment}) {
  return (
      <div className='"flex  rounded overflow-hidden shadow-lg'>
          <div class="flex flex-col px-6 py-4">
              <p className='font-bold'>{comment.comment_user} :</p>
              <p> {comment.comment}</p>
          </div>
    </div>
  )
}

export default CommentCard