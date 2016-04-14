import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLoginStatusIfNeeded } from '../actions/session';
import { getUsersIfNeeded } from '../actions/users';
import { getUserInfoIfNeeded } from '../actions/user-info';

import Header from '../src/templates/header';
import Footer from '../src/templates/footer';

class App extends Component {
  componentDidMount() {
    this.props.getLoginStatus();
    if(this.props.session.isLogin && !this.props.users.isInitialized) {
      this.props.getUsers();
    }
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLoginStatus() {
      dispatch(getLoginStatusIfNeeded());
    },
    getUsers() {
      dispatch(getUsersIfNeeded()).then(() => {
        dispatch(getUserInfoIfNeeded());
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
