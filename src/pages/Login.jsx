import {Link, useNavigate} from "react-router";
import {useState} from "react";
import {useAuth} from "../contexts/AuthContext.jsx";

const Login = () => {
  const {login} = useAuth();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(identity, password);
    if (!result) return alert('Failed to login');
    console.log(result);
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card shadow-xl bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Hi, Welcome Back
          </h2>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text text-white mb-1">Username or Email</span>
            </label><br/>
            <input
              type="text"
              name="identifier"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              placeholder="Username or Email"
              className="input input-bordered outline-none w-full bg-gray-950/50 text-white placeholder-gray-400 focus:bg-gray-950/80 focus:placeholder-gray-600 focus:outline-none focus:border-info transition"
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-white mb-1">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered outline-none w-full bg-gray-950/50 text-white placeholder-gray-400 focus:bg-gray-950/80 focus:placeholder-gray-600 focus:outline-none focus:border-info transition"
            />
          </div>

          <button onClick={handleLogin} className="btn btn-soft btn-success w-full transition">
            Login
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-sky-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
