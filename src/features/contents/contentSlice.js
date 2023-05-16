import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const contentSlice = createSlice({
    name: 'contents',
    initialState: {
        contentList: [],
        post: {
            user_name: '',
            image: '',
            creted_at: '',
            likes: 0,
            
        },
        comments:[]
    },
    reducers: {
        fetchContentList: (state, action) => {
            state.contentList = action.payload
        }
        ,
        addPost: (state, action) => {
            state.post=action.payload
        },
        fetchComment: (state, action) => {
            state.comments=action.payload
        },
        deletePostSuccess: (state, action) => {
            const deletedPostId = action.payload;
            state.contentList = state.contentList.filter((content) => content.id_content !== deletedPostId);
        },
        loadMore: (state, action) => {
            state.contentList=[...state.contentList,...action.payload]
        }
       
    }
})

export const {addContentList,addPost,fetchComment,deletePostSuccess,fetchContentList,loadMore}= contentSlice.actions
export default contentSlice.reducer

export function AddContentPost (token,content,offset) {
    return async (dispatch) => {
        console.log(content);
        const formData = new FormData();
        formData.append('file', content.image);
        formData.append('caption', content.caption);
        let response = await axios.post('http://localhost:8001/content/add-content', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response);
        alert(response.data.message)
        dispatch(fetchContent(offset.offset))
    }
}
export function fetchContent(offset) {
    return async (dispatch) => {
        let response = await axios.get(`http://localhost:8001/content/fetch-postlist?offset=${offset}`)
        dispatch(fetchContentList(response.data))
        console.log(response.data);
    }
}

export function deletePost(token, id, offset) {
    console.log(offset);
    return async (dispatch) => {
        let response = await axios.post(`http://localhost:8001/content/delete-content/${id}`, {},{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        dispatch(deletePostSuccess(id))
        alert(response.data)
    }
}
export function editPost(token, id, offset, caption) {
    return async (dispatch) => {
        let response = await axios.post(`http://localhost:8001/content/edit-content/${id}`, {caption},{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        dispatch(fetchContent(offset.offset))
        alert(response.data)
    }
}
export function fetchPost(id) {
    return async (dispatch) => {
        let response = await axios.get(`http://localhost:8001/content/fetch-post?contId=${id}`)
        dispatch(addPost(response.data))
        dispatch(fetchComment(response.data))
    }
    
}
export function likePost( id,offset) {
    return async (dispatch) => {

        let response = await axios.post(`http://localhost:8001/content/like-content?contId=${id}`,{})
        dispatch(fetchContent(offset))
            
    }    

    
}
export function postComment(token, id, comment) {
    return async () => {
        let response = await axios.post(`http://localhost:8001/content/upload-comment?contId=${id}`,{comment}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        alert(response.data.message)
    }
}

export function fetchMoreContent(offset) {
    console.log(offset);
    return async (dispatch) => {
        let response = await axios.get(`http://localhost:8001/content/fetch-postlist?offset=${offset}`)
        dispatch(loadMore(response.data))
        console.log(response.data);
    }
}

