import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeSortKey, changeReverse } from '../actions/settings';

const sortNameList = [
  {key: '', name: 'Default'},
  {key: 'name', name: 'Name'},
  {key: 'screen_name', name: 'Screen Name'},
  {key: 'friends_count', name: 'Following'},
  {key: 'followers_count', name: 'Followers'},
  {key: 'status.created_at', name: 'Last-update'}
];

function findSortName(key) {
  for(let i = 0; sortNameList.length > i; i++) {
    if(sortNameList[i].key === key) {
      return sortNameList[i].name;
    }
  }
  return undefined;
}

class SortButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reverse: false
    };
  }
  render() {
    const items = [];
    for(let i = 0; sortNameList.length > i; i++) {
      items.push(
        <a href="#" className="dropdown-item" key={i} onClick={e => {
          e.preventDefault();
          this.props.changeSortKey(sortNameList[i].key);
        }}>
          <i className={'fa fa-fw ' + (this.props.sort.key === sortNameList[i].key ? 'fa-check' : '')}></i>
          &nbsp;{sortNameList[i].name}
        </a>
      );
    }
    return (
      <div className="btn-group" role="group">
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-primary-outline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {findSortName(this.props.sort.key)}
          </button>
          <div className="dropdown-menu">
            {items}
          </div>
        </div>
        <button type="button" className="btn btn-primary-outline" onClick={() => this.props.changeReverse(this.props.sort.reverse)}>
          <i className={'fa fa-caret-' + (this.props.sort.reverse ? 'down' : 'up')}></i>
        </button>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    sort: state.settings.sort
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSortKey(key) {
      dispatch(changeSortKey(key));
    },
    changeReverse(bool) {
      dispatch(changeReverse(!bool));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortButton);
