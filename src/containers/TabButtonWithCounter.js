import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class TabButtonWithCounter extends Component {
  render() {
    return (
      <li className="nav-item">
        <a href={this.props.to} className={'nav-link ' + (this.props.to === '#friends' ? 'active' : '')} data-toggle="tab" role="tab" onClick={this.props.onClick}>{this.props.text}({this.props.count})</a>
      </li>
    );
  }
}

TabButtonWithCounter.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    count: (() => {
      switch(ownProps.to) {
      case '#selected':
        return Object.keys(state.users.users.allUserInfo).filter(id => state.users.users.allUserInfo[id].select).length;
      case '#friends':
        return state.users.users.friends.length;
      case '#followers':
        return state.users.users.followers.length;
      case '#kataomoi':
        return state.users.users.friends.filter(id => state.users.users.allUserInfo[id] && !state.users.users.allUserInfo[id].connections.includes('followed_by')).length;
      case '#kataomoware':
        return state.users.users.followers.filter(id => state.users.users.allUserInfo[id] && !state.users.users.allUserInfo[id].connections.includes('following')).length;
      default:
        return 0;
      }
    }).call(this)
  };
}

export default connect(mapStateToProps)(TabButtonWithCounter);
