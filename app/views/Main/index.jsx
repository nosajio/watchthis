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

  handleAddToList (item) {
    const {userWatchList} = this.state;
    const {id} = item;
    const isDupe = userWatchList.filter(it =>
      parseInt(id) === parseInt(it.id)
    );
    if (isDupe.length) {
      console.warn('Item is duplicate, stopping.');
      return;
    }
    listService.add(item);
    userWatchList.push(item);
    this.setState({ userWatchList });
  },

  render () {
    return <MainDom {...this}/>
  }
})

export default Main
