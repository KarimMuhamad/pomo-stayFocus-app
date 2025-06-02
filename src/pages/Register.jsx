import {Link, useNavigate} from "react-router";
import {useState} from "react";
import axios from "../api/axiosInstance"

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', {username, email, password}, {
        skipAuth: true
      });
      console.log(res);
      navigate('/login');
    } catch (error) {
      console.log('Failed to register: ', error.message);
      console.log(error.response?.data?.message);
      console.log(error)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card shadow-xl bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Sign Up
          </h2>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text text-white">Username</span>
            </label><br/>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="input input-bordered outline-none w-full bg-gray-950/50 text-white placeholder-gray-400 focus:bg-gray-950/80 focus:placeholder-gray-600 focus:outline-none focus:border-info transition"
            />
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label><br/>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="input input-bordered outline-none w-full bg-gray-950/50 text-white placeholder-gray-400 focus:bg-gray-950/80 focus:placeholder-gray-600 focus:outline-none focus:border-info transition"
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              className="input input-bordered outline-none w-full bg-gray-950/50 text-white placeholder-gray-400 focus:bg-gray-950/80 focus:placeholder-gray-600 focus:outline-none focus:border-info transition"
            />
          </div>

          <button onClick={handleRegister} className="btn btn-soft btn-success w-full transition">
            Register
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already Have Accountt?{" "}
            <Link to="/login" className="text-emerald-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
