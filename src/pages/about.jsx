import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div>
        <h1>Follow Managerについて</h1>
        <p>ReactとReduxを使った練習アプリです。データはログイン時にセッションを保持するだけで、データベースなどには保存しません。</p>
        <p>ソースコードは<a href="https://github.com/sunya9/follow-manager">Github</a>にあります。</p>
      </div>
    );
  }
}

export default About;
