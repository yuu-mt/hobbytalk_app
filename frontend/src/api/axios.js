import axios from "axios";

axios.defaults.withCredentials = true; // Cookie送信を許可
axios.defaults.baseURL = "http://localhost:8080/api"; // Laravel APIのURL
const api = axios.create({
  baseURL:"http://localhost:8080/api",
  withCredentials:true,
});

export default api;
