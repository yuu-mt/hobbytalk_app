import React, { useState } from "react";
import { createPost } from "../api/post";
import { useNavigate } from "react-router-dom";

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    try {
      const res = await createPost(formData);
      setMessage("投稿が完了しました！");
      console.log(res);
      // 成功したらトップページへ遷移
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error(error);
      setMessage("投稿に失敗しました。");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">新規投稿</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <textarea
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="いまどうしてる？"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div>
          <label className="block font-medium mb-1">画像を追加</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <div>
          <label className="block font-medium mb-1">動画を追加</label>
          <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg w-full"
        >
          投稿する
        </button>

        {message && <p className="text-center mt-2 text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
