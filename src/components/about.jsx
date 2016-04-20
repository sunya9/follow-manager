import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron-fluid jumbotron">
          <div className="container">
            <h1>Follow Managerについて</h1>
          </div>
        </div>
        <div className="container">
          <p>ReactとReduxを使った練習アプリです。データはログイン時にセッションを保持するだけで、データベースなどには保存しません。</p>
          <p>ソースコードは<a href="https://github.com/sunya9/follow-manager">Github</a>にあります。</p>
        </div>
      </div>
    );
  }
}

export default About;
