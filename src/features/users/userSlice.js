import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            userId:0,
            email: "",
            username: "",
            fullname: "",
            bio: "",
            pic: "",
            isVerify: false
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    }
})
 export const {setUser}=userSlice.actions
export default userSlice.reducer

export function fetchUser(token) {
    return async (dispatch) => {
        let response = await axios.post('http://localhost:8001/user/fetch-user', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        dispatch(setUser(response.data.userData))
        localStorage.setItem('token',response.data.token)
    }
}
export function editUser(token,user) {
    return async (dispatch) => {
        const formData = new FormData();
    formData.append('file', user.image);
    formData.append('username', user.username);
    formData.append('fullname', user.fullname);
    formData.append('bio',user.bio);
        let response = await axios.post('http://localhost:8001/user/edit-user', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              },
        })
        dispatch(fetchUser(token))
        alert(response.data.message)
    }
    
}