import './main.scss';
import React, { PropTypes } from 'react'

import UpTop from '../../components/UpTop';
import SearchBox from '../../components/SearchBox';
import MoviesList from '../../components/MoviesList';

const MainDom = (props) => {
  const {state} = props;
  const {userWatchList, userWatchedList} = state;

  if (! userWatchedList || ! userWatchList) return null;

  return (
    <main className="main-view">
      <UpTop busy={state.busy}>
        <section className="search-box-container">
          <SearchBox
            userWatchList={userWatchList}
            isBusy={props.busyCallback}
            addToList={props.handleAddToList}/>
        </section>
      </UpTop>
      <section className="user-watch-list main-tile">
        <header className="section-header">
          <h1>Your watch list</h1>
        </header>
        <MoviesList
          name="watch"
          markItem={props.markItem}
          setActiveMovie={props.handleActiveTile}
          activeTile={state.activeTile}
          isBusy={props.busyCallback}
          list={userWatchList}/>
      </section>

      <section className="user-watched-list main-tile">
        <header className="section-header">
          <h1>Movies you've watched</h1>
        </header>
        {userWatchedList.length ? (
          <MoviesList
            name="watched"
            markItem={props.markItem}
            setActiveMovie={props.handleActiveTile}
            activeTile={state.activeTile}
            isBusy={props.busyCallback}
            list={userWatchedList}/>
        ) : (
          <p>To move stuff to your watched list, just press "mark as watched" on any of the movies in your to watch list!</p>
        )}
      </section>
    </main>
  )
}

export default MainDom
