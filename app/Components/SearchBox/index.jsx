import React, { PropTypes } from 'react'

import './search-box.scss';
import search from '../../services/searchService';
import debounce from '../../helpers/debounce';

const SearchBox = React.createClass({

  handleSearchResults (res) {
    console.log(res);
  },

  handleRunSearch (event) {
    debounce(300, () => {
      const searchValue = event.target.value;
      search
        .movies(searchValue)
        .then(this.handleSearchResults);
    });
  },

  render () {
    return (
      <div className="search-box">
        <input
          onChange={this.handleRunSearch}
          placeholder="Search for a movie..."
          type="text"
          className="search-box__input"/>
      </div>
    )
  }
})

export default SearchBox
