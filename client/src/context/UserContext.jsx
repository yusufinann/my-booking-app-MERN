/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // If user is not already stored, fetch from the server
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch(() => {
          // Optional: Handle fetch error
        })
        .finally(() => {
          setReady(true); // Always set ready to true after the fetch attempt
        });
    } else {
      setReady(true);
    }
  }, [user]); // Empty dependency array ensures this effect only runs once

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
