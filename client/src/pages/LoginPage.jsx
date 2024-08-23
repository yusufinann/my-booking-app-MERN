/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: userInfo } = await axios.post("/login", { email, password });
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      alert(
        `Login failed: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <div>
            <button type="submit" className="primary">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <span>Login</span>
              )}
            </button>
          </div>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to="/register">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
