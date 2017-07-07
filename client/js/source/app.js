"use strict";

import UserStore from './flux/UserStore';
import UserActions from './flux/UserActions';
import Logo from './components/Logo';
import Button from './components/Button';
import React from 'react';
import ReactDOM from 'react-dom';
import Messenger from './components/Messenger';
import schema from './schema';

//let currentUser = UserActions.getUser({login: 'admin', password: '123'});
//console.log(currentUser);
UserStore.init();

ReactDOM.render(
  <div className="app">
    <div className="app-header">
      <div className="row">
        <div className="col-xs-3"><Logo/></div>
        <div className="col-xs-7"><span className="title">FriendMessenger</span></div>
        <div className="col-xs-2"><Button className="logout"><i className="fa fa-sign-out" aria-hidden="true"></i></Button></div>
      </div>
    </div>
    <Messenger />
  </div>,
  document.getElementById('pad')
);
