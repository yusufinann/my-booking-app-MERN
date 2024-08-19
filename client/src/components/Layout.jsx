import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="p-4 flex flex-col min-h-screen">
      <Header />  {/*This component is always at the top of the page */}
      <Outlet />  {/*Used to render nested routes. */}
      </div>
  );
}
