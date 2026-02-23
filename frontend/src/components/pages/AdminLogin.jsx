import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/admin/login",
      form
    );
    localStorage.setItem("token", res.data.token);
    navigate("/admin-dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-xl rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={e => setForm({...form, username: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={e => setForm({...form, password: e.target.value})}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;