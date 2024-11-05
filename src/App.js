import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home/Homecontainer";
import MovieDetails from './components/Pages/MovieDetails/Moviedetails';
import SeriesDetails from './components/Pages/SerieDetails/Seriedetails';
import Login from "./components/Pages/login-register/LoginContainer";
import Register from "./components/Pages/login-register/RegisterContainer";
import BarraNav from "./components/layout/navbar/navbar";
import Peliculas from "./components/Pages/Todas/PeliculasTodas";
import Series from "./components/Pages/Todas/SeriesTodas";


function App() {
  return (
    <Router>
      <div className="app">
        <BarraNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie-details/:id" element={<MovieDetails />} />
          <Route path="/series-details/:id" element={<SeriesDetails />} />
          <Route path="/peliculas" element={<Peliculas />} />
          <Route path="/series" element={<Series />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;