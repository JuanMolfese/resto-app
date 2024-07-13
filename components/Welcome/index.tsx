"use client"
import { useEffect, useState } from 'react';
import Slider from './Slider';
import Landing from './Landing';

// Hook para detectar el tamaño de la pantalla
const useMediaQuery = (query:any) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', documentChangeHandler);

    // Verificar el estado inicial
    documentChangeHandler();

    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [query]);

  return matches;
};

const Welcome = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <div>
      {isMobile && (
        <div className="mobile-welcome">
          {/* Tu contenido para móviles */}          
          <Slider/>
        </div>
      )}

      {isTablet && (
        <div className="tablet-welcome">
          {/* Tu contenido para tablets */}
          <Landing/>
        </div>
      )}

      {isDesktop && (
        <div className="desktop-welcome">
          {/* Tu contenido para escritorio */}
          <Landing/>
        </div>
      )}
    </div>
  );
};

export default Welcome;