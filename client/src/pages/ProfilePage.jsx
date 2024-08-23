import { useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import PlacesPage from "./PlacesPage";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function Account() {
  const { user, setUser, ready } = useContext(UserContext);
  const navigate = useNavigate();
  let { subpage } = useParams();
  subpage = subpage ?? "profile";

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not logged in</div>;
  }

  async function logout() {
    try {
      await axios.post("/logout");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
console.log(user._id)
  return (
    <>
      <div>
        <AccountNav subpage={subpage} />
        {subpage === "profile" ? (
          <div>
            <p>Logged in as {user.name} ({user.email})</p>
            <button className="primary" onClick={logout}>
              Logout
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
