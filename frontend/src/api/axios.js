import axios from "axios";

axios.defaults.withCredentials = true; // Cookie送信を許可
axios.defaults.baseURL = "http://localhost:8080/api"; // Laravel APIのURL
const api = axios.create({
  baseURL:"http://localhost:8080/api",
  withCredentials:true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
