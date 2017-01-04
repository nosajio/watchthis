import {default as _} from 'lodash/core';
import React, { PropTypes } from 'react'

import './search-box.scss';
import search from '../../services/searchService';
import list from '../../services/listService';
import debounce from '../../helpers/debounce';

const SearchBox = React.createClass({
  propTypes: {
    isBusy: PropTypes.func.isRequired,
  },

  getInitialState () {
    return {
      searchString: null,
      searchResults: [],
      activeResult: null,
      working: null,
    };
  },

  handleSearchResults (res) {
    if (_.isEmpty(res.results)) {
      this.props.isBusy(false);
      return this.setState({searchResults: [], working: false});
    }
    const resultCount = 10;
    this.props.isBusy(false);
    this.setState({
      searchResults: res.results.slice(0, resultCount),
      working: false,
    });
  },

  handleRunSearch (event) {
    const searchValue = event.target.value;
    debounce(300, () => {
      this.props.isBusy(true);
      this.setState({ searchString: searchValue, working: true });
      search
        .movies(searchValue)
        .then(this.handleSearchResults);
    });
  },

  handleHover (id) {
    this.setState({ activeResult: id });
  },

  handleAddToList (item) {
    list.add(item);
  },

  resultEl (result, index) {
    const imageBase = 'http://image.tmdb.org/t/p/w185/';
    const {activeResult} = this.state;
    return (
      <li
        className={`search-result ${activeResult === result.id ? 'search-result--is-active' : ''}`}
        key={index}
        onMouseOver={this.handleHover.bind(this, result.id)}
        onMouseOut={this.handleHover.bind(this, null)}>
        <span className="search-result__poster">
            {result.poster_path ? (
              <img src={`${imageBase}/${result.poster_path}`} alt=""/>
            ) : (
              <span className="poster-placeholder"></span>
            )}
        </span>
        <span className="search-result__title">
          <h3>{result.title}</h3>
        </span>
        <span onClick={this.handleAddToList.bind(this, result)} className="result-options">
          <span className="result-options__add">Add to list</span>
        </span>
      </li>
    )
  },

  render () {
    const {searchResults, searchString, working} = this.state;
    return (
      <div className="search-box">
        <input
          onChange={this.handleRunSearch}
          placeholder="Search for a movie..."
          type="text"
          className="search-box__input"/>
        {searchResults.length > 0 ? (
          <ul className="search-results">
            {searchResults.map(this.resultEl)}
          </ul>
        ) : ! _.isEmpty(searchString) && ! working ? (
          <span className="search-no-results">
            There are no results for <strong>&quot;{searchString}&quot;</strong> (its not you, its me.)</span>
        ) : null}
      </div>
    )
  }
})

export default SearchBox
