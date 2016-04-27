import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { requestLogout } from '../actions/session';

class SessionButton extends Component {
  render() {
    return this.props.session.isLogin ? (
        <div>
        <a href={this.props.session.screen_name} target="_new">
          <img src={this.props.session.icon} alt="" width="24" height="24" />
          {this.props.session.name}
        </a>としてログイン中&nbsp;
        <button className="btn btn-primary-outline" onClick={this.props.requestLogout}>
          ログアウト
        </button>
        </div>
      ) : (
        <a href="/token" className="btn btn-primary">Twitterアカウントでログイン</a>
      );
  }
}

SessionButton.propTypes = {
  session: PropTypes.object.isRequired,
  requestLogout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    session: state.session
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
