import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { changeSortKey } from '../actions/settings';
class SortThButton extends Component {
  render() {
    const className = this.props.sort.key === this.props.sortKey ? ('fa fa-caret-' + (this.props.sort.reverse ? 'down' : 'up')) : 'fa fa-caret-up invisible';
    return (
      <th className={this.props.className} onClick={this.props.setSortKey.bind(null, this.props.sortKey)}>
        {this.props.name}
        &nbsp;
        <i className={className}></i>
      </th>
    );
  }
}

SortThButton.propTypes = {
  sortKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    sort: state.settings.sort
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSortKey(sortKey) {
      dispatch(changeSortKey(sortKey));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortThButton);
