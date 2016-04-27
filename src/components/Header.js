import React from 'react';
import { Link } from 'react-router';

import SessionButton from '../containers/SessionButton';

export default () => (
  <header id="header">
    <nav className="navbar navbar-light bg-faded">
      <div className="container">
        <button type="button" className="navbar-toggler hidden-sm-up" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
        &#9776;
        </button>
        <div className="collapse navbar-toggleable-xs" id="navbar-collapse">
          <Link className="navbar-brand" to="/">Follow Manager</Link>
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <a href="#" className="nav-link" data-toggle="modal" data-target="#about">About</a>
            </li>
          </ul>
          <div className="pull-xs-right">
            <SessionButton />
          </div>
        </div>
      </div>
    </nav>
    <div className="modal fade" id="about" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1>Follow Managerについて</h1>
          </div>
          <div className="modal-body">
            <p>ReactとReduxを使った練習アプリです。データはログイン時にセッションを保持するだけで、データベースなどには保存しません。</p>
            <p>テストアプリなのでエラー処理をほとんどしていません。また、TwitterのAPIの仕様上、フォロー数+フォロワー数-相互フォロー数の値が1500を超えていると多分エラーを吐きます。ここらへんの対応をするのが面倒くさいので諦めました。要するにおもちゃです。</p>
            <p>ソースコードは<a href="https://github.com/sunya9/follow-manager">Github</a>にあります。</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">OK</button>
          </div>
        </div>
      </div>
    </div>
  </header>
);
