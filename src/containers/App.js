import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLoginStatusIfNeeded } from '../actions/session';
import { getUsersIfNeeded } from '../actions/users';

import Header from '../components/Header';
import Footer from '../components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.getLoginStatus().then(() =>{
      if(this.props.session.isLogin && !this.props.users.isInitialized) {
        this.props.getUsers();
      }
    });
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
  return {
    session: state.session,
    users: state.users
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLoginStatus() {
      return dispatch(getLoginStatusIfNeeded());
    },
    getUsers() {
      dispatch(getUsersIfNeeded());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
