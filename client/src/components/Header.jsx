import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import AccountNav from "./AccountNav";

export default function Header() {
  const { user } = useContext(UserContext);
  
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 md:p-2 bg-gradient-to-r from-blue-600 to-gray-600 text-white shadow-lg">
      
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2 mb-4 md:mb-0">
        <svg
          width="40"
          height="40"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M29.3864 22.7101C29.2429 22.3073 ... (rest of your SVG path) ..." />
        </svg>
        <span className="font-bold text-2xl md:text-3xl">My Booking</span>
      </Link>
      
      {/* Navigation Section */}
      <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4 md:mb-0">
        <Link 
          to="/search" 
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-600 transition duration-300 hover:bg-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <span className="font-semibold">Search</span>
        </Link>

        {/* Conditionally render AccountNav or Login/Register links */}
        {user ? (
          <AccountNav />
        ) : (
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-full bg-white text-blue-600 transition duration-300 hover:bg-blue-100">
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 rounded-full bg-white text-blue-600 transition duration-300 hover:bg-blue-100">
              Register
            </Link>
          </div>
        )}
      </nav>
      
      {/* User Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <Link 
            to="/account" 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-600 transition duration-300 hover:bg-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-8 h-8"
            >
              <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z"></path>
            </svg>
            <span className="font-semibold">{user.name}</span>
          </Link>
        ) : (
          <Link 
            to="/login" 
            className="px-4 py-2 rounded-full bg-white text-blue-600 transition duration-300 hover:bg-blue-100">
            Login or Register Now
          </Link>
        )}
      </div>
    </header>
  );
}
