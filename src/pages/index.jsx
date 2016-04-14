import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import List from '../components/list';

class Index extends Component {
  render() {
    const list = this.props.isLogin ? <List /> : null;
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>Follow Manager</h1>
            <p>That is the friends & followers management tool of Twitter.</p>
            <a href="/token" className="btn btn-link">Login with Twitter</a>
          </div>
        </div>
        <div className="container">
          {list}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.session;
}

export default connect(mapStateToProps)(Index);
