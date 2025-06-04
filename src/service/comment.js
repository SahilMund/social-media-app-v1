import axios from "axios";
import { API_ENDPOINTS } from "./endpoint";

export const getCommentsByPostId = (postId, token) =>
  axios.get(API_ENDPOINTS.GET_COMMENTS_BY_POSTID(postId), {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const addComment = (postId, payload, token) =>
  axios.post(API_ENDPOINTS.ADD_COMMENT(postId), payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });

export const deleteComment = (commentId, token) =>
  axios.delete(API_ENDPOINTS.DELTE_COMMENT(commentId), {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
