import React, { PropTypes } from 'react'

import './movies-list.scss';

const MoviesList = (props) => {
  const {list} = props;

  if (! list) {
    return (
      <div className="movies-list">
        <div className="movies-list__empty">
          <h2>You don't have any saved movies yet. Use the search bar above to add some!</h2>
        </div>
      </div>
    );
  }

  const movies = list.content;

  const movieEl = (movie, index) => {
    const imageBase = 'http://image.tmdb.org/t/p/w300/';
    return (
      <li key={index} className="movies-list__movie">
        <span className="movies-list__movie-cover">
          {movie.poster_path ? (
            <img src={`${imageBase}${movie.poster_path}`} alt=""/>
          ) : (
            <span className="movie-cover-placeholder"></span>
          )}
        </span>
        <span className="movies-list__movie-info">
          <h2>{movie.title}</h2>
        </span>
      </li>
    );
  };

  return (
    <div className="movies-list">
      <ul className="movies-list__list">
        {movies.map(movieEl)}
      </ul>
    </div>
  )
}

export default MoviesList
