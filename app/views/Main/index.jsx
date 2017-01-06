import React, { PropTypes } from 'react'

import listService from '../../services/listService';
import MainDom from './main-dom';

const Main = React.createClass({
  getInitialState () {
    return {
      userWatchList: null,
      userWatchedList: null,
      busy: false,
    };
  },

  componentWillMount () {
    this.fetchUserLists();
  },

  fetchUserLists () {
    listService
      .get()
      .then(userList =>
        this.setState({
          userWatchList: userList.towatch,
          userWatchedList: userList.watched
        })
      );
  },

  busyCallback (busy) {
    this.setState({ busy });
  },

  handleAddToList () {

  },

  render () {
    return <MainDom {...this}/>
  }
})

export default Main
