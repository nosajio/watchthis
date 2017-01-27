import {default as _} from 'lodash/core';
import React, { PropTypes } from 'react'

import './search-box.scss';
import search from '../../services/searchService';
import debounce from '../../helpers/debounce';

const SearchBox = React.createClass({
  propTypes: {
    userWatchList: PropTypes.array,
    isBusy: PropTypes.func.isRequired,
    addToList: PropTypes.func.isRequired,
  },

  getInitialState () {
    return {
      searchString: null,
      searchResults: [],
      activeResult: null,
      working: null,
      focussed: false,
      userWatchList: [],
    };
  },

  componentWillReceiveProps (nextProps) {
    if (! nextProps.userWatchList) {
      return;
    }
    const {userWatchList} = this.props;
    this.setState({userWatchList})
  },

  refreshResults () {
    const {searchResults} = this.state;
    if (! searchResults.length) {
      return;
    }
    const addedResults = this.checkForAdded({ results: searchResults });
    this.handleSearchResults(addedResults);
  },

  checkForAdded (res) {
    if (! res.results) {
      return res;
    }
    const {userWatchList} = this.state;
    const addedResults = [];
    userWatchList.forEach(({id}) => {
      let isAlreadyAdded = res.results.filter(it =>
        parseInt(it.id) === parseInt(id)
      );
      if (isAlreadyAdded.length) {
        addedResults.push(parseInt(isAlreadyAdded[0].id));
      }
    });
    res.results = res.results.map(it => {
      if (addedResults.indexOf(parseInt(it.id)) > -1) {
        it.added = true;
      }
      return it;
    });
    return res;
  },

  sortAndTrim (res) {
    if (! res.results) {
      return res;
    }
    const resultCount = 10;
    res.results = res.results.slice(0, resultCount);
    return res;
  },

  handleSearchResults (res) {
    if (_.isEmpty(res.results)) {
      this.props.isBusy(false);
      return this.setState({searchResults: [], working: false});
    }
    this.props.isBusy(false);
    this.setState({
      searchResults: res.results,
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
        .then(this.sortAndTrim)
        .then(this.checkForAdded)
        .then(this.handleSearchResults);
    });
  },

  handleHover (id) {
    this.setState({ activeResult: id });
  },

  handleSearchFocus (event) {
    this.setState({focussed: true});
  },

  handleSearchBlur (event) {
    // Basically, just reset everything
    this.setState({
      searchString: null,
      searchResults: [],
      activeResult: null,
      working: null,
      focussed: false,
    });
    this.refs['search-input'].value = '';
  },

  handleAddToList (result) {
    this.props.addToList(result);
    this.refreshResults();
  },

  resultEl (result, index) {
    const imageBase = 'http://image.tmdb.org/t/p/w185/';
    const {activeResult} = this.state;
    const parentClassNames = [
      activeResult === result.id ? 'search-result--is-active' : null,
      result.added ? 'search-result--is-added' : null
    ];
    return (
      <li
        className={`search-result ${parentClassNames.join(' ')}`}
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
    const {
      focussed,
      searchResults,
      searchString,
      working,
      searchTerm
    } = this.state;

    return (
      <div className={`search-box ${focussed ? 'search-box--is-focussed' : ''}`}>
        <div className="search-box__inner">
          <input
            onChange={this.handleRunSearch}
            onFocus={this.handleSearchFocus}
            placeholder="Search for a movie..."
            type="text"
            ref="search-input"
            className="search-box__input"/>
          {searchResults.length > 0 && focussed ? (
            <ul className="search-results">
              {searchResults.map(this.resultEl)}
            </ul>
          ) : ! _.isEmpty(searchString) && ! working && focussed ? (
            <span className="search-no-results">
              This is lame. There's no results for <strong>&quot;{searchString}&quot;</strong>
            </span>
          ) : null}
          <div className="search-box__exit" onClick={this.handleSearchBlur}></div>
        </div>
      </div>
    )
  }
})

export default SearchBox
