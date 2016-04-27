import React, { Component, PropTypes } from 'react';
import User from './user';
import { connect } from 'react-redux';
import { selectAll } from '../actions/users';
import Checkbox from '../components/Checkbox';
import SortThButton from '../containers/SortThButton';

const dateTest = /_at$/;

class List extends Component {
  constructor(props) {
    super(props);
    this.exist = this.exist.bind(this);
    this.generateUser = this.generateUser.bind(this);
    this.filterUser = this.filterUser.bind(this);
    this.sort = this.sort.bind(this);
  }
  exist(id) {
    return this.props.users.allUserInfo[id].select;
  }
  generateUser(id, index) {
    return <User key={id} userId={id} index={index + 1} />;
  }
  filterUser(id) {
    const user = this.props.users.allUserInfo[id];
    const matchId = user.screen_name.indexOf(this.props.filter) >= 0;
    const matchName = user.name.indexOf(this.props.filter) >= 0;
    return matchId || matchName;
  }
  sort(a, b) {
    a = this.props.users.allUserInfo[a];
    b = this.props.users.allUserInfo[b];
    const path = this.props.settings.sort.key.split('.');
    while(path.length > 0 && a && b) {
      const key = path.shift();
      a = a[key];
      b = b[key];
      if(dateTest.test(key)) {
        a = new Date(a).getTime();
        b = new Date(b).getTime();
      }
    }
    let res = 0;
    if(a && b && typeof a === 'string') {
      a = a.toLowerCase();
      b = b.toLowerCase();
    }
    res = (a > b ? 1 : -1);
    if(path.length > 0) {
      // error: undefined a or b
      res = typeof a === 'undefined' ? 1 : -1;
    }
    return res * (this.props.settings.sort.reverse ? -1 : 1);
  }

  render() {
    const filteredUsers = (
      this.props.filter
        ? this.props.showUsers.filter(this.filterUser)
        : this.props.showUsers
      );
    if(this.props.settings.sort.key) {
      filteredUsers.sort(this.sort);
    } else if(this.props.settings.sort.reverse) {
      filteredUsers.reverse();
    }
    const rows = filteredUsers.map(this.generateUser);
    const isEmpty = rows.length === 0;
    const empty = this.props.usersInitialized
      ? 'ユーザは見つかりませんでした。'
      : (
        <span>
          <i className="fa fa-spinner fa-spin"></i>&nbsp;取得中です…。
        </span>
      );
    return this.props.settings.showMode === 'card' ? (
        isEmpty ? (<p>{empty}</p>) : (
          <ul className="card-deck list-unstyled">
          {rows}
          </ul>
        )
    ) : (
      <div className="table-responsive">
        <table className="table table-hover user-list-table">
          <thead>
            <tr>
              <th className="user-list-table__checkbox" onClick={() => this.props.selectAll(filteredUsers)}>
                <Checkbox onChange={() => this.props.selectAll(filteredUsers)} disdabled={this.props.showUsers.length > 0} checked={filteredUsers.length > 0 && filteredUsers.every(this.exist)} indeterminate={() => {
                  const count = filteredUsers.filter(id => this.props.users.allUserInfo[id].select).length;
                  return filteredUsers.length > 0 && 0 < count && count < filteredUsers.length;
                }} />
              </th>
              <SortThButton className="user-list-table__name" sortKey="name" name="名前" />
              <SortThButton className="user-list-table__screen_name" sortKey="screen_name" name="@ID" />
              <SortThButton className="user-list-table__following" sortKey="friends_count" name="フォロー数" />
              <SortThButton className="user-list-table__followers" sortKey="followers_count" name="フォロワー数" />
              <SortThButton className="user-list-table__last-update" sortKey="status.created_at" name="最終更新日" />
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td colSpan="7">
                  {empty}
                </td>
              </tr>
            ) : rows}
          </tbody>
        </table>
      </div>
    );
  }
}


List.propTypes = {
  type: PropTypes.oneOf(['selected', 'friends', 'followers', 'kataomoi', 'kataomoware']).isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    users: state.users.users,
    usersInitialized: state.users.isInitialized,
    settings: state.settings,
    filter: state.filter.text,
    showUsers: (() => {
      switch(ownProps.type) {
      case 'selected':
        return Object.keys(state.users.users.allUserInfo)
          .filter(id => state.users.users.allUserInfo[id].select);
      case 'friends':
        return state.users.users.friends;
      case 'followers':
        return state.users.users.followers;
      case 'kataomoi':
        return state.users.users.friends.filter(id => !state.users.users.allUserInfo[id].connections.includes('followed_by'));
      case 'kataomoware':
        return state.users.users.followers.filter(id => !state.users.users.allUserInfo[id].connections.includes('following'));
      }
    }).call(this).slice(0)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectAll(showUsers) {
      dispatch(selectAll(showUsers));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
