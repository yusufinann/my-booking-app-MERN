import { useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import PlacesPage from "./PlacesPage";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function Account() {
  const { user, setUser, ready } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for logout loading
  let { subpage } = useParams();
  subpage = subpage ?? "profile";

  if (!ready) {
    return <div className="flex items-center justify-center min-h-screen"><div className="text-gray-600">Loading...</div></div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen text-gray-700">User not logged in</div>;
  }

  async function logout() {
    setLoading(true); // Set loading to true when logout starts
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false); // Set loading to false when logout finishes
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <AccountNav subpage={subpage} />
        {subpage === "profile" ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, {user.name}</h2>
            <p className="text-gray-600 mb-6">Email: {user.email}</p>
            <button
              className={`primary flex justify-center items-center w-full py-3 rounded-lg text-white font-bold transition-colors duration-300 ${
                loading ? "bg-gray-300" : "bg-primary hover:bg-primary-dark"
              }`}
              onClick={logout}
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-white"></div>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        ) : (
          <>
            {subpage === "bookings" && <div className="mt-6 text-gray-700">Booking Content</div>}
            {subpage === "places" && <PlacesPage />}
          </>
        )}
      </div>
    </div>
  );
}
