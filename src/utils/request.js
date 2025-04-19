import axios from "axios";
import Cookies from 'js-cookie';

const API_DOMAIN = "http://localhost:3300/";

const instance = axios.create({
  baseURL: API_DOMAIN,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");

  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
