import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeShowMode } from '../actions/settings';
import { getUsersIfNeeded } from '../actions/users';
import FilterInput from '../components/FilterInput';
import SortButton from '../containers/SortButton';

class Toolbar extends Component {
  render() {
    return (
      <div className="clearfix">
        <div className="pull-xs-left">
          <div className="btn-toolbar" role="toolbar">
            <div className="btn-group" role="group">
              <button className="btn btn-primary-outline" onClick={this.props.getUsers} disabled={this.props.isFetching}>
                <i className={'fa fa-refresh ' + (this.props.isFetching ? 'fa-spin' : '')}></i>
              </button>
            </div>
          </div>
        </div>
        <div className="pull-xs-right">
          <div className="btn-toolbar" role="toolbar">
            <div className="btn-group" role="group" data-toggle="mode-switch">
              <label className={'btn btn-primary-outline ' + (this.props.showMode === 'card' ? 'active' : '')} title="カード表示">
                <input type="radio" name="show_mode" value='card' onChange={this.props.changeShowMode} checked={this.props.showMode === 'card'} />
                <i className="fa fa-th"></i>
              </label>
              <label className={'btn btn-primary-outline ' + (this.props.showMode === 'list' ? 'active' : '')} title="詳細表示">
                <input type="radio" name="show_mode" value='list' onChange={this.props.changeShowMode} checked={this.props.showMode === 'list'} />
                <i className="fa fa-list"></i>
              </label>
            </div>
            <SortButton />
            <div className="btn-group" role="group">
              <FilterInput />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.users.isFetching,
    showMode: state.settings.showMode
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
