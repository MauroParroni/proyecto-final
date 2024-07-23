import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetails from './components/Pages/MovieDetails/Moviedetails';
import Home from "./components/Pages/Home/Homecontainer";
import Login from "./components/Pages/login-register/LoginContainer";
import Register from "./components/Pages/login-register/RegisterContainer";
import BarraNav from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import Busqueda from './components/Pages/Busqueda/busqueda';

function App() {
  const handleFilterChange = (newFilter) => {
    console.log("New filter:", newFilter);
  };

  return (
    <Router>
      <div className="app">
        <BarraNav onFilterChange={handleFilterChange} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie-details" element={<MovieDetails />} />
          <Route path="/busqueda" element={<Busqueda />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
