import './main.scss';
import React, { PropTypes } from 'react'

import UpTop from '../../components/UpTop';
import SearchBox from '../../components/SearchBox';
import MoviesList from '../../components/MoviesList';

const MainDom = (props) => {
  const {state} = props;
  const {userWatchList, userWatchedList} = state;

  return (
    <section className="main-view">
      <UpTop busy={state.busy}>
        <section className="search-box-container">
          <SearchBox isBusy={props.busyCallback} addToList={props.handleAddToList}/>
        </section>
      </UpTop>
      <section className="user-watch-list">
        <header className="section-header">
          <h1>Your watch list</h1>
        </header>
        <MoviesList isBusy={props.busyCallback} list={userWatchList}/>
      </section>

      <section className="user-watched-list">
        <header className="section-header">
          <h1>Movies you've watched</h1>
        </header>
        <MoviesList isBusy={props.busyCallback} list={userWatchedList}/>
      </section>
    </section>
  )
}

export default MainDom
