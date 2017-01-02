import {default as _} from 'lodash/core';
import fetch from 'isomorphic-fetch';

export default listService();

function listService() {
  return {show}

  function show() {
    return fetch(`/api/my-list`).then(res => res.json());
  }
}
