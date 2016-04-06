import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLoginStatusIfNeeded } from '../actions/session';

import Header from 'templates/header';
import Footer from 'templates/footer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getLoginStatusIfNeeded())
  }

  render() {
    return (
      <div>
        <Header />
        <main className="container">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

App.defaultProps = {
  login: false
};

export default connect()(App);
