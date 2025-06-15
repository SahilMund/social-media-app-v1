import { axiosBaseInstance } from "../axios/instance";
import { API_ENDPOINTS } from "./endpoint";

export const fileUpload = (data) =>
  axiosBaseInstance.post(API_ENDPOINTS.FILE_UPLOAD, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

export const createPost = (data) =>
  axiosBaseInstance.post(API_ENDPOINTS.CREATE_POST, data);

export const updatePost = (payload, postId) =>
  axiosBaseInstance.put(API_ENDPOINTS.UPDATE_POST(postId), payload);

export const getPost = () => axiosBaseInstance.get(API_ENDPOINTS.GET_POST);
export const getMyPosts = () =>
  axiosBaseInstance.get(API_ENDPOINTS.GET_MY_POSTS);

export const deletePost = (postId) =>
  axiosBaseInstance.delete(API_ENDPOINTS.DELETE_POST(postId));

export const getPostById = (postId) =>
  axiosBaseInstance.get(API_ENDPOINTS.GET_BY_POSTID(postId));

export const likePost = (postId) =>
  axiosBaseInstance.post(API_ENDPOINTS.LIKE_POST(postId), null);

export const UnlikePost = (postId) =>
  axiosBaseInstance.post(API_ENDPOINTS.UNLIKE_POST(postId), null);
