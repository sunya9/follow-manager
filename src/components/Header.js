import React from 'react';
import { Link } from 'react-router';

import SessionButton from '../containers/SessionButton';
import HeaderLink from '../containers/HeaderLink';

export default () => (
  <header id="header">
    <nav className="navbar navbar-light bg-faded">
      <div className="container">
        <button type="button" className="navbar-toggler hidden-sm-up" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
        &#9776;
        </button>
        <div className="collapse navbar-toggleable-xs" id="navbar-collapse">
          <Link className="navbar-brand" to="/">Follow Manager</Link>
          <ul className="nav navbar-nav">
            <HeaderLink to="about" text="About" />
          </ul>
          <div className="pull-xs-right">
            <SessionButton />
          </div>
        </div>
      </div>
    </nav>
  </header>
);
