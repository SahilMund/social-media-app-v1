import axios from "axios";
import { API_ENDPOINTS } from "./endpoint";

export const userSignUp = (data) => axios.post(API_ENDPOINTS.SIGN_UP, data);
export const userLogin = (data) => axios.post(API_ENDPOINTS.LOG_IN, data);
export const userLogout = (token) => {
  return axios.delete(API_ENDPOINTS.LOG_OUT, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
