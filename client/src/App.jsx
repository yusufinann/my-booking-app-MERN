import { Route, Routes } from "react-router-dom";
import "./index.css"; // Importing Tailwind CSS
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import Account from "./pages/Account";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
