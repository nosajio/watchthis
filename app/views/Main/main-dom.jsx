import './main.scss';
import React, { PropTypes } from 'react'

import SearchBox from '../../components/SearchBox';
import MoviesList from '../../components/MoviesList';

const MainDom = (props) => {
  const {state} = props;

  return (
    <section className="main-view">
      <section className="search-box-container">
        <SearchBox addToList={props.handleAddToList}/>
      </section>
      <section className="user-watch-list">
        <MoviesList movies={state.userMovies}/>
      </section>
    </section>
  )
}

export default MainDom
