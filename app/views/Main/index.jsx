import React, { PropTypes } from 'react'

import listService from '../../services/listService';
import MainDom from './main-dom';

const Main = React.createClass({
  getInitialState () {
    return {
      userList: null,
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

  handleAddToList () {

  },

  render () {
    return <MainDom {...this}/>
  }
})

export default Main
