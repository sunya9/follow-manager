import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getLoginStatusIfNeeded, requestLogout } from '../../actions/session';
import List from '../components/list';

class Index extends Component {
  render() {
    const list = this.props.isLogin ? <List /> : null;
    return (
      <div>
        <h1>Follow Manager</h1>
        <p>That is the following management tool of Twitter.</p>
        <a href="/token" className="btn btn-default">Login with Twitter</a>
        <button className="btn btn-default" onClick={this.props.getLoginStatusClick}>{this.props.isFetching ? '取得中' : '取得完了'} {this.props.isLogin ? 'ログイン中' : '未ログイン'}</button>
        <button className="btn btn-default" onClick={this.props.requestLogout}>ログアウト</button>
        {list}
      </div>
    );
  }
}

Index.propTypes = {
  isLogin: PropTypes.bool.isRequired
};

Index.defaultProps = {
  isLogin: false
};

function mapStateToProps(state) {
  return state.session;
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLoginStatusClick() {
      dispatch(getLoginStatusIfNeeded());
    },
    requestLogout() {
      dispatch(requestLogout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
