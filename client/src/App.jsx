import { Route, Routes } from "react-router-dom";
import "./index.css"; // Importing Tailwind CSS
import IndexPage from "./pages/IndexPage";

function App() {
  return (

    <Routes>
      <Route index element={<IndexPage/>}></Route>
    </Routes>
   
  );
}

export default App;
