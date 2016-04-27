import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateFilterAsync } from '../actions/filter';

class FilterInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <input {...this.props} type="text" placeholder="Filter user" onChange={this.onChange} className="form-control" />
    );
  }

  onChange(e) {
    this.props.updateFilter(e.target.value);
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    updateFilter(text) {
      dispatch(updateFilterAsync(text));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterInput);
