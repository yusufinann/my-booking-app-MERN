import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <div className="flex flex-col">
         <Header />  {/*This component is always at the top of the page */}
      </div>
     <div className="p-4 flex flex-col min-h-screen">
           <Outlet />  {/*Used to render nested routes. */}
     </div>
 
      </div>
  );
}
