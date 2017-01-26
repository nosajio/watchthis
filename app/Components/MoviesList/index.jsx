import React, { PropTypes } from 'react'
import scroll from 'scroll';

import Chevron from '../Chevron';
import './movies-list.scss';

const MoviesList = (props) => {
  const {list, setActiveMovie, activeTile, markItem} = props;
  if (! list) {
    return (
      <div className="movies-list">
        <div className="movies-list__empty">
          <h2>You don't have any saved movies yet. Use the search bar above to add some!</h2>
        </div>
      </div>
    );
  }

  const movies = list;

  const movieEl = (movie, index) => {
    const imageBase = 'http://image.tmdb.org/t/p/w300/';
    const {activeTile} = props;
    let activeId = activeTile ? activeTile.id : null;
    return (
      <li
        key={index}
        onMouseOver={setActiveMovie.bind(null, movie)}
        onMouseOut={setActiveMovie.bind(null, null)}
        className={`movies-list__movie ${activeId === movie.id ? 'is-active': ''}`}>
        <span className="movies-list__movie-cover">
          {movie.poster_path ? (
            <img src={`${imageBase}${movie.poster_path}`} alt=""/>
          ) : (
            <span className="movie-cover-placeholder"></span>
          )}
        </span>
        <span className="movies-list__movie-info">
          <h2 className="movie-title">{movie.title} <span className="movie-title__date">{new Date(movie.release_date).getFullYear()}</span></h2>
        </span>
        <span className="movies-list__interact">
          <span onClick={markItem.bind(null, 'watched', movie.id)} className="movies-list__option movies-list__option--watched">
            <strong>Mark as watched</strong>
          </span>
          <span onClick={markItem.bind(null, 'remove', movie.id)} className="movies-list__option movies-list__option--remove">
            <strong>Remove</strong>
          </span>
        </span>
      </li>
    );
  };

  let scrollEventListener, currentScrollOffset, listEl;

  const updateScrollOffset = (event) => {
    const newOffset = event.target.scrollLeft;
    currentScrollOffset = newOffset;
  }

  const attachScrollEvent = (el) => {
    if (! el || scrollEventListener) return;
    scrollEventListener = el.addEventListener('scroll', updateScrollOffset);
    listEl = el;
  };

  const moveScrollPos = (inc) => {
    if (! inc || ! listEl) return;
    scroll.left(listEl, listEl.scrollLeft + inc);
  };

  return (
    <div className="movies-list__wrapper">
      <div className="movies-list__chevron movies-list__chevron--left">
        {movies.length ? <Chevron direction="left" onClick={moveScrollPos.bind(null, -400)}/> : null}
      </div>
      <div className="movies-list" ref={attachScrollEvent}>
        <ul className="movies-list__list">
          {movies.map(movieEl)}
        </ul>
      </div>
      <div className="movies-list__chevron movies-list__chevron--right">
        {movies.length ? <Chevron direction="right" onClick={moveScrollPos.bind(null, 400)}/> : null}
      </div>
    </div>
  )
}

export default MoviesList
