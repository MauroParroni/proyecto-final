import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home/Homecontainer";
import Login from "./components/Pages/login-register/LoginContainer";
import Register from "./components/Pages/login-register/RegisterContainer";
import BarraNav from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";

function App() {
  return (
    <Router>
      <div className="app">
        <BarraNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
