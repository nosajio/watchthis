import {default as _} from 'lodash/core';
import fetch from 'isomorphic-fetch';

export default listService();

function listService() {
  return {get, add, mark}

  function get() {
    const request = {
      method: 'GET',
      cache: 'default',
      mode: 'same-origin'
    };
    return fetch('/api/my-list', request).then(res => res.json());
  }

  function add(movie) {
    if (! _.isObject(movie) || _.isEmpty(movie)) {
      throw new TypeError('movie argument is required');
    }
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
      cache: 'default',
      mode: 'same-origin'
    };
    return fetch('/api/my-list/content', request).then(res => res.json());
  }

  function mark(flag, id) {
    const request = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'default',
      mode: 'same-origin'
    };
    return fetch(`/api/my-list/content/${id}?flag=${flag}`, request).then(res => res.json());
  }
}
