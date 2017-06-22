"use strict";

import UserStore from './flux/UserStore';
import UserActions from './flux/UserActions';
import Logo from './components/Logo';
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
      <Logo/> FriendMessenger
    </div>
    <Messenger />
  </div>,
  document.getElementById('pad')
);
