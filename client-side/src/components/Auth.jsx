import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? 'login' : 'register';
    try{
      const response = await axios.post(
        `http://https://full-stack-minimalistpackinglist.onrender.com/api/auth/${endpoint}`, 
        { email, password },
        { headers: { 'Content-Type': 'application/json'}}
      );

      const { token } = response.data;
      localStorage.setItem("token", token)
      navigate("/home");
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center">
          <span>{isLogin ? "Login" : "Sign Up"}</span>
        </h2>
        <form className="mt-4" onSubmit={handleAuth}>
          <div className="mb-4">
            <label className="block text-gray-300">Email:</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Password:</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p
          className="mt-4 text-center text-gray-400 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </p>
        <button className="mt-7" onClick={() => navigate("/")}>Back to Landing Page</button>
      </div>
    </div>
  );
};

export default Auth;
