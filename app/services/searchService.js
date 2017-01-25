import {default as _} from 'lodash/core';
import fetch from 'isomorphic-fetch';

export default searchService();

function searchService() {
  return {movies}

  function movies(searchStr) {
    if (_.isEmpty(searchStr) || searchStr.length < 1)  {
      return Promise.resolve([]);
    }
    return fetch(`/api/search?q=${searchStr}`).then(res => res.json());
  }
}
