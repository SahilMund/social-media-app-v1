import { API_ENDPOINTS } from "./endpoint";
import { axiosBaseInstance } from "../axios/instance";

export const getCommentsByPostId = (postId) =>
  axiosBaseInstance.get(API_ENDPOINTS.GET_COMMENTS_BY_POSTID(postId));

export const addComment = (postId, payload) =>
  axiosBaseInstance.post(API_ENDPOINTS.ADD_COMMENT(postId), payload);

export const deleteComment = (commentId) =>
  axiosBaseInstance.delete(API_ENDPOINTS.DELTE_COMMENT(commentId));
