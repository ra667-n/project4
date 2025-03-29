
import './Ghibli'
import React, { useState, useEffect } from 'react'; 
import './App.css';

const Ghibli = () => {
  const [film, setFilm] = useState(null); 
  const [allFilms, setAllFilms] = useState([]); 
  const [banList, setBanList] = useState([]); 
  const [loading, setLoading] = useState(false); 

  
  useEffect(() => {
    const fetchAllFilms = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://ghibliapi.vercel.app/films');
        const films = await response.json();
        setAllFilms(films); 
        getRandomFilm(films); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    fetchAllFilms();
  }, []); 

  
  const getFilteredFilms = (films) => {
    return films.filter(
      (film) =>
        !banList.includes(film.title) &&
        !banList.includes(film.director) &&
        !banList.includes(film.release_date)
    );
  };

  
  const getRandomFilm = (films = allFilms) => {
    const filteredFilms = getFilteredFilms(films);
    if (filteredFilms.length === 0) {
      alert('No more films available! Clear your ban list.');
      return;
    }
    const randomFilm =
      filteredFilms[Math.floor(Math.random() * filteredFilms.length)];
    setFilm(randomFilm);
  };

 
  const toggleBan = (attribute) => {
    if (banList.includes(attribute)) {
      setBanList(banList.filter((item) => item !== attribute));
    } else {
      setBanList([...banList, attribute]);
    }
  };

  return (
    <div>
      <h1>Studio Ghibli Film Catalogue</h1>

      {film && (
        <div>
          <img
            src={film.movie_banner}
            alt={film.title}
            style={{ width: '70%', borderRadius: '10px' }} 
          />
          <h2>{film.title}</h2>
          <p>
            <strong>Director:</strong> {film.director}
          </p>
          <p>
            <strong>Release Year:</strong> {film.release_date}
          </p>
          <p>{film.description}</p>
          
          <button onClick={() => toggleBan(film.title)}>
            {banList.includes(film.title)
              ? 'Unban Film'
              : 'Ban This Film'}
          </button>
        </div>
      )}

      <button onClick={() => getRandomFilm()} style={{ marginTop: '20px' }}>
        Show Random Film
      </button>

      <div style={{ marginTop: '20px' }}>
        <h3>Banned Films:</h3>
        {banList.map((title) => (
          <p key={title}>{title}</p>
        ))}
      </div>
    </div>
  );
};

export default Ghibli;
