import React, { PropTypes } from 'react'

import listService from '../../services/listService';
import MainDom from './main-dom';

const Main = React.createClass({
  getInitialState () {
    return {
      userList: null,
      busy: false,
    };
  },

  componentWillMount () {
    this.fetchUserList();
  },

  fetchUserList () {
    listService
      .show()
      .then(userList => this.setState({userList}));
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
