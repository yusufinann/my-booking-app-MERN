import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate=useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    setLoading(true); // Start loading animation

    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
      setLoading(false); // Stop loading animation
      navigate('/login');
    } catch (error) {
      setLoading(false); // Stop loading animation
      if (error.response && error.response.status === 400 && error.response.data.error === "Email already exists") {
        alert('Email already exists. Please use a different email.');
      } else {
        alert('Registration failed. Please try again later');
      }
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text"
                 placeholder="Your Name"
                 value={name}
                 onChange={e => setName(e.target.value)} />
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={e => setEmail(e.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={e => setPassword(e.target.value)} />
          <button className="primary" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <div className="text-center py-2 text-gray-500">
            Do you have an account yet? <Link className="underline text-black" to={'/login'}>Login now</Link>
          </div>
        </form>
        {loading && (
          <div className="text-center mt-4">
            <svg
              className="animate-spin h-5 w-5 text-gray-500 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <p className="text-gray-500 mt-2">Please wait...</p>
          </div>
        )}
      </div>
    </div>
  );
}
