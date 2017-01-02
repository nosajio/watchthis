import React, { PropTypes } from 'react'
import MainDom from './main-dom';

const Main = React.createClass({
  getInitialState () {
    return {
      userMovies: null,
    };
  },

  handleAddToList () {

  },

  render () {
    return <MainDom {...this}/>
  }
})

export default Main
