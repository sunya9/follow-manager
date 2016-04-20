import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class TabButtonWithCounter extends Component {
  render() {
    let count = 0;
    switch(this.props.type) {
    case 'selected':
      count = Object.keys(this.props.allUserInfo).filter(id => this.props.allUserInfo[id].select).length;
      break;
    case 'friends':
      count = this.props.friends.length;
      break;
    case 'followers':
      count = this.props.followers.length;
      break;
    case 'kataomoi':
      count = this.props.friends.filter(id => this.props.allUserInfo[id] && !this.props.allUserInfo[id].connections.includes('followed_by')).length;
      break;
    case 'kataomoware':
      count = this.props.followers.filter(id => this.props.allUserInfo[id] && !this.props.allUserInfo[id].connections.includes('following')).length;
      break;
    }
    return (
      <li className="nav-item">
        <a href={this.props.to} className={'nav-link ' + (this.props.type === 'friends' ? 'active' : '')} data-toggle="tab" role="tab">{this.props.text}({count})</a>
      </li>
    );
  }
}

TabButtonWithCounter.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  type: PropTypes.oneOf(['selected', 'friends', 'followers', 'kataomoi', 'kataomoware']).isRequired,
  allUserInfo: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
  followers: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {...state.users.users};
}

export default connect(mapStateToProps)(TabButtonWithCounter);
