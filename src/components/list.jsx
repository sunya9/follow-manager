import React, { Component, PropTypes } from 'react';
import User from './user';
import { getUsersIfNeeded } from '../../actions/users';
import { connect } from 'react-redux';

class List extends Component {
  render() {
    let rows = [];
    switch(this.props.type) {
    case 'selected':
      rows = Object.keys(this.props.users.allUserInfo)
        .filter(id => this.props.users.allUserInfo[id].select)
        .map(generateUser);
      break;
    case 'friends':
      rows = this.props.users.friends.map(generateUser);
      break;
    case 'followers':
      rows = this.props.users.followers.map(generateUser);
      break;
    case 'kataomoi':
      rows = this.props.users.friends.filter(id => !this.props.users.allUserInfo[id].connections.includes('followed_by'))
        .map(generateUser);
      break;
    case 'kataomoware':
      rows = this.props.users.followers.filter(id => !this.props.users.allUserInfo[id].connections.includes('following'))
        .map(generateUser);
      break;
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

function generateUser(id) {
  return <User key={id} userId={+id} />;
}

List.propTypes = {
  type: PropTypes.oneOf(['selected', 'friends', 'followers', 'kataomoi', 'kataomoware']).isRequired
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
