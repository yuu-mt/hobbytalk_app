import { useState } from "react";
import axios from "./api/axios";

function App() {
  const [user, setUser] = useState(null);

  const handleRegister = async () => {
    await axios.get("/sanctum/csrf-cookie"); // CSRFトークン初期化
    await axios.post("/api/register", {
      name: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    alert("User registered!");
  };

  const handleLogin = async () => {
    await axios.get("/sanctum/csrf-cookie");
    await axios.post("/api/login", {
      email: "test@example.com",
      password: "password123",
    });
    alert("Login success");
  };

  const fetchUser = async () => {
    const res = await axios.get("/api/user");
    setUser(res.data);
  };

  const handleLogout = async () => {
    await axios.post("/api/logout");
    alert("Logged out");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Sanctum Auth Demo</h1>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={fetchUser}>Get User</button>
      <button onClick={handleLogout}>Logout</button>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
}

export default App;
