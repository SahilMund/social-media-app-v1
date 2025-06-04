import axios from "axios";
import { API_ENDPOINTS } from "./endpoint";

export const fileUpload = (data) => axios.post(API_ENDPOINTS.FILE_UPLOAD, data,{
    headers:{
        'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
});

export const createPost = (data, token) => axios.post(API_ENDPOINTS.CREATE_POST, data,{
    headers:{
        'Authorization': 'Bearer ' + token
    },
    withCredentials: true
});

export const updatePost = (payload, token, postId) => axios.put(API_ENDPOINTS.UPDATE_POST(postId), payload,{
    headers:{
        'Authorization': 'Bearer ' + token
    },
    withCredentials: true
});

export const getPost = ( token) => axios.get(API_ENDPOINTS.GET_POST,{
    headers:{
        'Authorization': 'Bearer ' + token
    },
});
export const getMyPosts = ( token) => axios.get(API_ENDPOINTS.GET_MY_POSTS,{
    headers:{
        'Authorization': 'Bearer ' + token
    },
});

export const deletePost = ( postId, token) => axios.delete(API_ENDPOINTS.DELETE_POST(postId),{
    headers:{
        'Authorization': 'Bearer ' + token
    },
});

export const getPostById = (postId, token) => axios.get(API_ENDPOINTS.GET_BY_POSTID(postId),{
    headers:{
        'Authorization': 'Bearer ' + token
    },
});

export const likePost = ( postId, token) => axios.post(API_ENDPOINTS.LIKE_POST(postId), null,{
    headers:{
        'Authorization': 'Bearer ' + token
    },
    withCredentials: true
});

export const UnlikePost = ( postId, token) => axios.post(API_ENDPOINTS.UNLIKE_POST(postId), null,{
    headers:{
        'Authorization': 'Bearer ' + token
    },
    withCredentials: true
});