import './search-box.scss';
import React, { PropTypes } from 'react'

const SearchBox = React.createClass({
  render () {
    return (
      <div className="search-box">
        <input placeholder="Search for a movie..." type="text" className="search-box__input"/>
      </div>
    )
  }
})

export default SearchBox
