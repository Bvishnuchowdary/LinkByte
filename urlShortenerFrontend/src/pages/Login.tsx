import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const backendurl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${backendurl}/api/auth/public/login`, {
        username,
        password,
      }, { withCredentials: true });
      const token = response.data.token;

      // Store JWT in localStorage
      console.log("JWT Token:", token);
      localStorage.setItem("jwtToken", token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br bg-black px-4">
      <div className="w-full max-w-md bg-black rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to LinkByte</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-white mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Click here to register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
