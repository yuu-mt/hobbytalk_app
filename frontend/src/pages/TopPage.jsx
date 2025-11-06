import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/post";
import { useNavigate } from "react-router-dom"; 

const TopPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <header className="bg-white w-full shadow p-4 text-center font-bold text-lg">
        <h1 className="text-4xl py-2">
          <span className="text-blue-500">H</span>obby<span className="text-red-300">T</span>alk
        </h1>

        <button onClick={() => navigate("/create")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + 投稿

        </button>

      </header>

      <div className="w-full max-w-md mt-4 space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            <strong>{post.user?.name ?? "不明なユーザー"}</strong>
            <p className="mt-2">{post.content}</p>
            {post.image_path && (
              <img
                src={`http://localhost:8080/storage/${post.image_path}`}
                className="w-full rounded mt-3"
                alt="post"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPage;