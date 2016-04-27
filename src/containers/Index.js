import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from './List';
import Toolbar from './Toolbar';
import TabButtonWithCounter from './TabButtonWithCounter';

class Index extends Component {
  constructor(props) {
    super(props);
    this.changeList = this.changeList.bind(this);
    this.state = {
      listType: 'friends'
    };
  }
  changeList(e) {
    this.setState({
      listType: e.currentTarget.hash.substring(1)
    });
  }
  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>Follow Manager</h1>
            <p>That is the friends & followers management tool of Twitter.</p>
          </div>
        </div>
        <div className="container">
          {this.props.isLogin ? (
            <div>
              <Toolbar />
              <ul className="nav nav-tabs" role="tablist">
                <TabButtonWithCounter to="#selected" text="選択したユーザ" onClick={this.changeList} />
                <TabButtonWithCounter to="#friends" text="Following" onClick={this.changeList} />
                <TabButtonWithCounter to="#followers" text="Followers" onClick={this.changeList} />
                <TabButtonWithCounter to="#kataomoi" text="片思い" onClick={this.changeList} />
                <TabButtonWithCounter to="#kataomoware" text="片思われ" onClick={this.changeList} />
              </ul>
              <div className="tab-content">
                <List type={this.state.listType} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return  {
    isLogin: state.session.isLogin
  };
}

export default connect(mapStateToProps)(Index);
