import React, { Component, PropTypes } from 'react';
import User from './user';
import { getUsersIfNeeded } from '../../actions/users';
import { connect } from 'react-redux';

class List extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    const rows = [];
    this.props.users.forEach(user => {
      rows.push(<User data={user} />);
    });

    return (
      <div>
        <button className="btn btn-default" onClick={this.props.getUsers}>再取得</button>
        <ul>
          {rows}
        </ul>
      </div>
    );
  }
}

List.propTytpes = {
  users: PropTypes.array
};

List.defaultProps = {
  users: []
};

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
