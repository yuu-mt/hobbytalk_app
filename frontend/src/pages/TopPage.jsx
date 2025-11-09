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
    <div className="min-h-screen flex bg-white flex-col items-center">
      <header className="bg-white w-full flex justify-between shadow p-4 text-center font-bold text-lg">
        <h1 className="text-4xl py-2">
          <span className="text-blue-500">H</span>obby<span className="text-red-300">T</span>alk
        </h1>
                        <button onClick={() => navigate("/login")}
              className="bg-red-500 text-white px-2 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                ログイン
            </button>

            
            <button onClick={() => navigate("/create")}
              className="bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                + 投稿
            </button>
      </header>

      <div className="w-full max-w-md mt-4 space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-md shadow-sm">

            {/* プロフィール行 */}
            <div className="flex items-center p-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-700 font-bold text-sm">
                  {post.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="ml-3 font-semibold text-gray-800">{post.user.name}</span>
            </div>

            {/* 画像 */}
            {post.image_path && (
              <img
                src={`http://localhost:8080/storage/${post.image_path}`}
                alt="post"
                className="w-full object-cover max-h-[500px]"
              />
            )}

            {/* いいね・コメント */}
            <div className="p-4">
              <div className="flex items-center space-x-4 mb-2">
                <button className="text-gray-700 hover:text-red-500">❤️</button>
                <button className="text-gray-700 hover:text-gray-900">💬</button>
              </div>

              {/* キャプション */}
              <p className="text-gray-800">
                <span className="font-semibold">{post.user.name}</span>
              </p>
              <p>
                {post.content}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default TopPage;