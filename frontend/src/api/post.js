import { UNSAFE_AwaitContextProvider } from "react-router-dom";
import axios from "./axios";

export const fetchPosts = async () => {
  try {
    const response = await axios.get("/posts");
    return response.data;
  } catch (error) {
    console.error("投稿一覧の取得に失敗:", error);
    throw error;
  }
};

export const createPost = async (formData) => {
  const response = await axios.post("/posts" , formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data
};