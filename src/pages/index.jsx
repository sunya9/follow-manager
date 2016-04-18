import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import List from '../components/list';

class Index extends Component {
  render() {
    console.log(this.props);
    const selectUserCount = Object.keys(this.props.users.users.allUserInfo).filter(id => this.props.users.users.allUserInfo[id].select).length;
    const friendsCount = this.props.users.users.friends.length;
    const followersCount = this.props.users.users.followers.length;
    const loginContents = this.props.session.isLogin ? (
      <div className="container">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <a href="#selected-users" className="nav-link" data-toggle="tab" role="tab">選択したユーザ({selectUserCount})</a>
          </li>
          <li className="nav-item">
            <a href="#friends" className="nav-link active" data-toggle="tab" role="tab">Friends({friendsCount})</a>
          </li>
          <li className="nav-item">
            <a href="#followers" className="nav-link" data-toggle="tab" role="tab">Followers({followersCount})</a>
          </li>
          <li className="nav-item">
            <a href="#kataomoi" className="nav-link" data-toggle="tab" role="tab">片思い</a>
          </li>
          <li className="nav-item">
            <a href="#kataomoware" className="nav-link" data-toggle="tab" role="tab">片思われ</a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane" role="tabpanel" id="selected-users"><List type="selected" /></div>
          <div className="tab-pane active" role="tabpanel" id="friends"><List type="friends" /></div>
          <div className="tab-pane" role="tabpanel" id="followers"><List type="followers" /></div>
          <div className="tab-pane" role="tabpanel" id="kataomoi"><List type="kataomoi" /></div>
          <div className="tab-pane" role="tabpanel" id="kataomoware"><List type="kataomoware" /></div>
        </div>
      </div>
    ) : null;
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>Follow Manager</h1>
            <p>That is the friends & followers management tool of Twitter.</p>
          </div>
        </div>
        {loginContents}
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

export default connect(mapStateToProps)(Index);
