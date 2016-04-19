import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeShowMode } from '../../actions/settings';
import { getUsersIfNeeded } from '../../actions/users';

class Toolbar extends Component {
  render() {
    return (
      <div className="btn-toolbar" role="toolbar">
        <div className="btn-group" role="group">
          <button className="btn btn-primary-outline" onClick={this.props.getUsers} disabled={this.props.users.isFetching}>
            <i className={'fa fa-refresh ' + (this.props.users.isFetching ? 'fa-spin' : '')}></i>
          </button>
        </div>
        <div className="btn-group" role="group" data-toggle="mode-switch">
          <label className={'btn btn-primary-outline ' + (this.props.settings.showMode === 'card' ? 'active' : '')} title="Show as a card">
            <input type="radio" name="show_mode" value='card' onChange={this.props.changeShowMode} checked={this.props.settings.showMode === 'card'} />
            <i className="fa fa-th"></i>
          </label>
          <label className={'btn btn-primary-outline ' + (this.props.settings.showMode === 'list' ? 'active' : '')} title="Show as a list">
            <input type="radio" name="show_mode" value='list' onChange={this.props.changeShowMode} checked={this.props.settings.showMode === 'list'} />
            <i className="fa fa-list"></i>
          </label>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    settings: state.settings
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers() {
      dispatch(getUsersIfNeeded());
    },
    changeShowMode(e) {
      dispatch(changeShowMode(e.target.value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
