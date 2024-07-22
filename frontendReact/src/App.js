import Home from "./components/home/Home.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Login from "./components/LoginRegister/LoginRegister.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Carausel from "./components/home/carousel.jsx";

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer />
      </div>
      {!isLoginPage && (
        <div>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
