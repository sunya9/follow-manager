import React, { Component, PropTypes } from 'react';
import User from './user';
import { connect } from 'react-redux';

import { selectAll } from '../../actions/users';

class List extends Component {
  constructor(props) {
    super(props);
    this.exist = this.exist.bind(this);
  }
  exist(id) {
    return this.props.users.users.allUserInfo[id].select;
  }
  render() {
    let showUsers;
    switch(this.props.type) {
    case 'selected':
      showUsers = Object.keys(this.props.users.users.allUserInfo)
        .filter(id => this.props.users.users.allUserInfo[id].select);
      break;
    case 'friends':
      showUsers = this.props.users.users.friends;
      break;
    case 'followers':
      showUsers = this.props.users.users.followers;
      break;
    case 'kataomoi':
      showUsers = this.props.users.users.friends.filter(id => !this.props.users.users.allUserInfo[id].connections.includes('followed_by'))
      break;
    case 'kataomoware':
      showUsers = this.props.users.users.followers.filter(id => !this.props.users.users.allUserInfo[id].connections.includes('following'))
      break;
    }
    const rows = showUsers.map(generateUser);
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
                <input type="checkbox" onChange={() => this.props.selectAll(showUsers)} disdabled={showUsers.length > 0} checked={showUsers.length > 0 && showUsers.every(this.exist)} ref={input => {
                  if (input) {
                    const count = showUsers.filter(id => this.props.users.users.allUserInfo[id].select).length;
                    input.indeterminate = showUsers.length > 0 && 0 < count && count < showUsers.length;
                  }
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

function generateUser(id, index) {
  return <User key={id} userId={+id} index={index+1} />;
}

List.propTypes = {
  type: PropTypes.oneOf(['selected', 'friends', 'followers', 'kataomoi', 'kataomoware']).isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users,
    settings: state.settings
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
