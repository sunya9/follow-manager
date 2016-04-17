import React, { Component, PropTypes } from 'react';
import User from './user';
import { getUsersIfNeeded } from '../../actions/users';
import { connect } from 'react-redux';

class List extends Component {
  render() {
    const rows = [];
    if(this.props.users.friends) {
      this.props.users.friends.forEach(id => {
        // console.log(user);
        rows.push(
            <User key={id} userId={id} />
        );
      });
    }

    return (
      <div>
        <button className="btn btn-default" onClick={this.props.getUsers}>再取得</button>
        <div className="card-deck">
          {rows}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.users;
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers() {
      dispatch(getUsersIfNeeded());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
