import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class HeaderLink extends Component {
  constructor(props) {
    super(props);
    this.isActive = this.isActive.bind(this);
  }

  render() {
    return (
      <li className={'nav-item ' + this.isActive(this.props.to)}><Link to={this.props.to} className="nav-link">{this.props.text}</Link></li>
    );
  }

  isActive(name) {
    return this.props.pathname === name ? 'active' : '';
  }
}

HeaderLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  pathname: PropTypes.string
};

function mapStateToProps(state) {
  return {
    pathname: state.routing.locationBeforeTransitions.pathname
  };
}

export default connect(mapStateToProps)(HeaderLink);
