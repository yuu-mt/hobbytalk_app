import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/axios";

export default function RegisterPage() {
const navigate = useNavigate();
const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    birthday: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await api.post("/register", form);
      console.log("登録成功:", response.data);

      setIsSuccess(true);
      setMessage("✅ 登録が完了しました！3秒後にログイン画面へ移動します。");
      
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("❌ 登録エラー:", error.response?.data || error);
      if (error.response?.status === 422) {
        setMessage("⚠️ 入力内容にエラーがあります");
        console.error(error.response.data.errors);
      } else {
        setMessage("🚨 サーバーエラーが発生しました");
      }
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          新規登録
        </h2>
        <form className="space-y-4"onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="名前"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="ユーザー名"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="メールアドレス"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="パスワード"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="パスワード（確認用）"
            className="border rounded-lg w-full p-2"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="birthday"
            placeholder="誕生日"
            className="border rounded-lg w-full p-2"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className={`w-full py-2 rounded-full font-semibold transition-colors ${
              isSuccess ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSuccess ? "登録完了！" : "登録"}
          </button>
        </form>

        {message && (
          <p className={`text-center mt-4 text-sm font-medium ${isSuccess ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <p className="text-sm text-center mt-4">
          すでにアカウントをお持ちですか？{" "}
          <a href="/login" className="text-blue-600 font-semibold">
            ログイン
          </a>
        </p>

      </div>
    </div>
  );
}
