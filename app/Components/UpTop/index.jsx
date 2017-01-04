import React, { PropTypes } from 'react'

import Logo from '../Logo';
import './up-top.scss';

const UpTop = (props) => {
  const {busy} = props;

  return (
    <header className="up-top">
      <div className="app-logo">
        <Logo busy={busy}/>
      </div>
      <span className="app-logo-text">watchthis</span>
    </header>
  )
}

export default UpTop;
