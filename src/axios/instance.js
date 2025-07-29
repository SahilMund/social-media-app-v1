import axios from "axios";
import { getAuthToken } from "../helpers/localstorage";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const BASE_URL = `${SERVER_URL}/api`;

export const axiosBaseInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosBaseInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosBaseInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (!response.data.success) {
      //showa toast messgae
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  }
);
