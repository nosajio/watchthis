import React, { PropTypes } from 'react'

import listService from '../../services/listService';
import MainDom from './main-dom';

const Main = React.createClass({
  getInitialState () {
    return {
      userWatchList: null,
      userWatchedList: null,
      busy: false,
      activeTimer: null,
      activeTile: null,
    };
  },

  componentWillMount () {
    this.fetchUserLists();
  },

  /**
   * Handle Active Tile
   * Marks the passed item as 'active'
   *
   * @param {Object} item
   */
  handleActiveTile (item) {
    if (this.state.activeTimer) {
      clearTimeout(this.state.activeTimer);
    }
    const delay = 400;
    const activeTimer = setTimeout(() => this.setState({activeTile: item}), delay)
    this.setState({ activeTimer });
  },

  /**
   * Fetch User Lists
   * Goes and gets the lists for signed in user
   *
   * @returns {Promise}
   */
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

  /**
   * Busy Callback
   * For telling all downstream components that the app is 'busy'
   *
   * @param {boolean} busy
   */
  busyCallback (busy) {
    this.setState({ busy });
  },

  /**
   * Mark Item
   * For moving and removing an item in a list
   *
   * @param {String} flag - ie. 'remove', 'watched'
   * @param {Number} itemId
   */
  markItem (flag, itemId) {
    listService
      .mark(flag, itemId)
      .then(res => console.log(res));
  },

  /**
   * Handle Add to List
   * For moving a item from search to a list
   *
   * @param {Object} item
   */
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
