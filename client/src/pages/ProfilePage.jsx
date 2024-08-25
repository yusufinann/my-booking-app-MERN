import { useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import PlacesPage from "./PlacesPage";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function Account() {
  const { user, setUser, ready } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Logout işlemi için loading state
  let { subpage } = useParams();
  subpage = subpage ?? "profile";

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not logged in</div>;
  }

  async function logout() {
    setLoading(true); // Logout işlemi başladığında loading'i true yap
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false); // İşlem bittiğinde loading'i false yap
    }
  }

  return (
    <>
      <div>
        <AccountNav subpage={subpage} />
        {subpage === "profile" ? (
          <div>
            <p>Logged in as {user.name} ({user.email})</p>
            <button className="primary flex justify-center items-center" onClick={logout} disabled={loading}>
              {loading ? (
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        ) : (
          <>
            {subpage === "bookings" && <p>Booking Content</p>}
            {subpage === "places" && <PlacesPage />}
          </>
        )}
      </div>
    </>
  );
}
