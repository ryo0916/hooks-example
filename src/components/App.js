import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const Movie_API_URL = process.env.OMDB_APIURL;

const initailState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      fetch(Movie_API_URL)
        .then(res => res.json())
        .then(jsonRes => {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonRes.Search
          });
        });
    }, []);
  
    const search = searchValue => {
      dispatch({
        type: "SEARCH_MOVIES_REQUEST"
      });
    

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.OMDB_APIKEY}`)
      .then(res => res.json())
      .then(jsonRes => {
        if(jsonRes.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonRes.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonRes.Error
          });
        }
      });
    };

    const { movies, errorMessage, loading } = state;

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
