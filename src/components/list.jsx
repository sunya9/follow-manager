import React, { Component, PropTypes } from 'react';
import User from './user';
import { getUsersIfNeeded } from '../../actions/users';
import { connect } from 'react-redux';

class List extends Component {
  componentDidMount() {

  }
  render() {
    const rows = [];
    console.log(this.props);
    if(this.props.users.users.friends) {
      this.props.users.users.friends.forEach(id => {
        const user = Object.assign({id}, this.props.users.users.allUserInfo[id]);
        // console.log(user);
        rows.push(
          <li key={user.id}>
            <User data={user} />
          </li>
        );
      });
    }

    return (
      <div>
        <button className="btn btn-default" onClick={this.props.getUsers}>再取得</button>
        <ol className="list-unstyled">
          {rows}
        </ol>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    userInfo: state.userInfo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers() {
      console.log(this);
      dispatch(getUsersIfNeeded()).then(() => {
        // const allUser = union()
        // const allUserInfo =
        // return Promise.all(allUserInfo);
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
