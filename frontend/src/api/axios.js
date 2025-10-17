import axios from "axios";

axios.defaults.withCredentials = true; // Cookie送信を許可
axios.defaults.baseURL = "http://localhost:8080"; // Laravel APIのURL

export default axios;
