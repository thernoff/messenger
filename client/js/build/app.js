"use strict";

var _UserStore = require('./flux/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _UserActions = require('./flux/UserActions');

var _UserActions2 = _interopRequireDefault(_UserActions);

var _Logo = require('./components/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Messenger = require('./components/Messenger');

var _Messenger2 = _interopRequireDefault(_Messenger);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//let currentUser = UserActions.getUser({login: 'admin', password: '123'});
//console.log(currentUser);
_UserStore2.default.init();

_reactDom2.default.render(_react2.default.createElement(
  'div',
  { className: 'app' },
  _react2.default.createElement(
    'div',
    { className: 'app-header' },
    _react2.default.createElement(_Logo2.default, null),
    ' FriendMessenger'
  ),
  _react2.default.createElement(_Messenger2.default, null)
), document.getElementById('pad'));