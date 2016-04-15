import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getLoginStatusIfNeeded, requestLogout } from '../../actions/session';

class Header extends Component {
  render() {

    return (
      <header id="header">
        <nav className="navbar navbar-light bg-faded">
          <div className="container">
            <button type="button" className="navbar-toggler hidden-sm-up" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
            &#9776;
            </button>
            <div className="collapse navbar-toggleable-xs" id="navbar-collapse">
              <Link className="navbar-brand" to="/">Follow Manager</Link>
              <ul className="nav navbar-nav">
                <li className={'nav-item ' + this.props.isActive('about')}><Link to='about' className="nav-link">About</Link></li>
              </ul>
              <div className="pull-xs-right">
                <button className="btn btn-link" onClick={this.props.getLoginStatusClick}>{this.props.session.isFetching ? '取得中' : '取得完了'} {this.props.session.isLogin ? 'ログイン中' : '未ログイン'}</button>
                <button className="btn btn-link" onClick={this.props.requestLogout}>ログアウト</button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session,
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isActive(name) {
      return this.routing.locationBeforeTransitions.pathname === name ? 'active' : '';
    },
    getLoginStatusClick() {
      dispatch(getLoginStatusIfNeeded());
    },
    requestLogout() {
      dispatch(requestLogout());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
