import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Pages/Home/Homecontainer";
import MovieDetails from './components/Pages/MovieDetails/Moviedetails';
import SeriesDetails from './components/Pages/SerieDetails/Seriedetails';
import Login from "./components/Pages/login-register/LoginContainer";
import Register from "./components/Pages/login-register/RegisterContainer";
import Navbar from "./components/layout/navbar/navbar";
import Busqueda from "./components/layout/Busqueda/busqueda";
import Peliculas from "./components/Pages/Todas/PeliculasTodas";
import Series from "./components/Pages/Todas/SeriesTodas";
import ScrollToTop from "./components/layout/Scroll/scrolltoTop";


function App() {

  return ( 
    <Router>
      <div className="app">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie-details/:id" element={<MovieDetails />} />
          <Route path="/series-details/:id" element={<SeriesDetails />} />
          <Route path="/peliculas" element={<Peliculas />} />
          <Route path="/series" element={<Series />} />
          <Route path="/busqueda" element={<Busqueda />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;