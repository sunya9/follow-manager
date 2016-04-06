import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
      <header id="header">
        <nav className="navbar navbar-default">
          <div className="container">
            <div classs="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">Follow Manager</Link>
            </div>

            <div className="collapse navbar-collapse" id="navbar-collapse">
              <ul className="nav navbar-nav">
                <li><Link to='about'>About</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
