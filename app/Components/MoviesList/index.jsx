import './movies-list.scss';
import React, { PropTypes } from 'react'

const MoviesList = (props) => {
  const {movies} = props;

  const movieEl = (movie, index) => {
    return (
      <li className="movies-list__movie">
        {movie.title}
      </li>
    );
  };

  if (! movies) {
    return (
      <div className="movies-list">
        <div className="movies-list__empty">
          <h2>You don't have any saved movies yet. Use the search bar above to add some!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="movies-list">
      <ul className="movies-list__list">
        {movies.map(movieEl)}
      </ul>
    </div>
  )
}

export default MoviesList
