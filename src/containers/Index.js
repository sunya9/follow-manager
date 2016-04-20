import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from './List';
import Toolbar from './Toolbar';
import TabButtonWithCounter from './TabButtonWithCounter';

class Index extends Component {
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
                <TabButtonWithCounter to="#selected-users" type="selected" text="選択したユーザ" />
                <TabButtonWithCounter to="#friends" type="friends" text="Friends" />
                <TabButtonWithCounter to="#followers" type="followers" text="Followers" />
                <TabButtonWithCounter to="#kataomoi" type="kataomoi" text="片思い" />
                <TabButtonWithCounter to="#kataomoware" type="kataomoware" text="片思われ" />
              </ul>
              <div className="tab-content">
                <div className="tab-pane" role="tabpanel" id="selected-users"><List type="selected" /></div>
                <div className="tab-pane active" role="tabpanel" id="friends"><List type="friends" /></div>
                <div className="tab-pane" role="tabpanel" id="followers"><List type="followers" /></div>
                <div className="tab-pane" role="tabpanel" id="kataomoi"><List type="kataomoi" /></div>
                <div className="tab-pane" role="tabpanel" id="kataomoware"><List type="kataomoware" /></div>
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
