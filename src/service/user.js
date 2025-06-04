import axios from "axios";
import { API_ENDPOINTS } from "./endpoint";

export const getuserInfo = ( token) => axios.get(API_ENDPOINTS.GET_LOGGED_IN_USER_INFO,{
    headers:{
        'Authorization': 'Bearer ' + token
    },
});

export const updateUser = (  payload, token) => axios.put(API_ENDPOINTS.UPDATE_USER_INFO, payload,{
    headers:{
        'Authorization': 'Bearer ' + token
    },
    withCredentials: true
});