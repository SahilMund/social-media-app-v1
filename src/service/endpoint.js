const BASE_URL = "https://social-media-server-v1-awpt.onrender.com/api";

export const API_ENDPOINTS = {
  SIGN_UP: BASE_URL + "/auth/signup",
  LOG_IN: BASE_URL + "/auth/login",
  LOG_OUT: BASE_URL + "/auth/logout",
  GET_LOGGED_IN_USER_INFO: BASE_URL + "/auth/zuku",
  FILE_UPLOAD: BASE_URL + "/post/upload",
  CREATE_POST: BASE_URL + "/post/create",
  GET_POST: BASE_URL + "/post/all-posts",
  GET_MY_POSTS: BASE_URL + "/post/my-posts",
  DELETE_POST: (postId) => BASE_URL + `/post/delete/${postId}`,
  GET_BY_POSTID: (postId) => BASE_URL + `/post/view/${postId}`,
  UPDATE_POST: (postId) => BASE_URL + `/post/update/${postId}`,
  LIKE_POST: (postId) => BASE_URL + `/post/like/${postId}`,
  UNLIKE_POST: (postId) => BASE_URL + `/post/unlike/${postId}`,
  ADD_COMMENT: (postId) => BASE_URL + `/comment/create/${postId}`,
  GET_COMMENTS_BY_POSTID: (postId) => BASE_URL + `/comment/${postId}`,
  DELTE_COMMENT: (commentId) => BASE_URL + `/comment/${commentId}`,
  GET_USER_INFO: (userId) => BASE_URL + `/user/profile/${userId}`,
  UPDATE_USER_INFO:  BASE_URL + `/user/profile`,
};
