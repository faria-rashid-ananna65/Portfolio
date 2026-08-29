import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL && !process.env.REACT_APP_API_URL.includes("localhost")
      ? process.env.REACT_APP_API_URL
      : "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default API;
