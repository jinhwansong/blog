import axios from "axios";
import { getCookie } from "./cookies";

export const baseAxios = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  withCredentials: true,
});
export const authAxios = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  withCredentials: true,
  headers: { "Content-type": "application/json" },
});

baseAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error);
  }
);
authAxios.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    config.headers.Access_token = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
