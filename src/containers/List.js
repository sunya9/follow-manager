import React, { Component, PropTypes } from 'react';
import User from './user';
import { connect } from 'react-redux';

import { selectAll } from '../actions/users';
import Checkbox from '../components/Checkbox';

class List extends Component {
  constructor(props) {
    super(props);
    this.exist = this.exist.bind(this);
    this.generateUser = this.generateUser.bind(this);
  }
  exist(id) {
    return this.props.users.users.allUserInfo[id].select;
  }
  generateUser(id, index) {
    return <User key={id} userId={+id} index={index + 1} />;
  }
  render() {
    const rows = this.props.showUsers.map(this.generateUser);
    const isEmpty = rows.length === 0;
    const empty = 'ユーザは見つかりませんでした。';
    return this.props.settings.showMode === 'card' ? (
      <div>
        {isEmpty ? (<p>{empty}</p>) : (
          <ul className="card-deck list-unstyled">
          {rows}
          </ul>
        )}
      </div>
    ) : (
      <div className="table-responsive">
        <table className="table table-bordered table-hover user-list-table">
          <thead>
            <tr>
              <th>
                <Checkbox onChange={() => this.props.selectAll(this.props.showUsers)} disdabled={this.props.showUsers.length > 0} checked={this.props.showUsers.length > 0 && this.props.showUsers.every(this.exist)} indeterminate={() => {
                  const count = this.props.showUsers.filter(id => this.props.users.users.allUserInfo[id].select).length;
                  return this.props.showUsers.length > 0 && 0 < count && count < this.props.showUsers.length;
                }} />
              </th>
              <th className="user-list-table__index">#</th>
              <th>Name</th>
              <th>Screen Name</th>
              <th>Following</th>
              <th>Followers</th>
              <th>Last-update</th>
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
    users: state.users,
    settings: state.settings,
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
    }).call(this)
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
