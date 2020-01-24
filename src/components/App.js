import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const Movie_API_URL = process.env.OMDB_APIURL

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
      fetch(Movie_API_URL)
        .then(res => res.json())
        .then(jsonRes => {
          setMovies(jsonRes.Search);
          setLoading(false);
        });
    }, []);
  
    const search = searchValue => {
      setLoading(true);
      setErrorMessage(null);
    

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.OMDB_APIKEY}`)
      .then(res => res.json())
      .then(jsonRes => {
        if(jsonRes.Response = "True") {
          setMovies(jsonRes.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonRes.Error);
          setLoading(false);
        }
      });
    };

    return (
      <div className="App">
        <Header text="HOOKED" />
        <Search search={search} />
        <p className="App-intro">Sharing a few of our favourite movies</p>
        <div className="movies">
          {loading && !errorMessage ? (
            <span>loading...</span>
          ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
          ) : (
            movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
        </div>
      </div>
    )
};

export default App;
