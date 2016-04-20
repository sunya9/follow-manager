import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { requestLogout } from '../actions/session';

class SessionButton extends Component {
  render() {
    return this.props.isLogin ? (
        <button className="btn btn-primary-outline" onClick={this.props.requestLogout}>
          Logout
        </button>
      ) : (
        <a href="/token" className="btn btn-primary">Login with Twitter</a>
      );
  }
}

SessionButton.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  requestLogout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isLogin: state.session.isLogin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestLogout() {
      dispatch(requestLogout());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionButton);
