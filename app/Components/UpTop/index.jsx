import React, { PropTypes } from 'react'

import Logo from '../Logo';
import './up-top.scss';

const UpTop = (props) => {
  const {busy, children} = props;

  return (
    <header className="up-top">
      <div className="app-logo">
        <Logo busy={busy}/>
        <span className="app-logo-text">watchthis</span>
      </div>
      <div className="up-top__children">
        {children ? React.cloneElement(children) : null}
      </div>
    </header>
  )
}

export default UpTop;
