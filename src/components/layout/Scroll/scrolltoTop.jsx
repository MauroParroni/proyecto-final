import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Este componente se encargará de desplazar el scroll al inicio cuando cambie la URL
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Desplaza la página hacia la parte superior cuando cambia la ubicación
    window.scrollTo(0, 0);
  }, [location]); // Se ejecuta cada vez que cambia la ubicación

  return null; // No necesitamos renderizar nada
};

export default ScrollToTop;