import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage  from "./pages/RegisterPage";
import LoginPage  from "./pages/LoginPage";
import TopPage from "./pages/TopPage"; 
import CreatePostPage from "./pages/CreatePostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<CreatePostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
