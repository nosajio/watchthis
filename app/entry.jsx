import './watchthis.scss';
import 'file-loader?name=[name].[ext]!./static/index.html';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import App from './views/App';
import Main from './views/Main';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main}/>
    </Route>
  </Router>
), document.getElementById('App'));
