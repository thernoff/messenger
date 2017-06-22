'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _InfoPanel = require('./InfoPanel');

var _InfoPanel2 = _interopRequireDefault(_InfoPanel);

var _FriendPanel = require('./FriendPanel');

var _FriendPanel2 = _interopRequireDefault(_FriendPanel);

var _MessagePanel = require('./MessagePanel');

var _MessagePanel2 = _interopRequireDefault(_MessagePanel);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UserStore = require('../flux/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _UserActions = require('../flux/UserActions');

var _UserActions2 = _interopRequireDefault(_UserActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import Panels from './Panels';


var Messenger = function (_Component) {
    _inherits(Messenger, _Component);

    function Messenger() {
        _classCallCheck(this, Messenger);

        var _this = _possibleConstructorReturn(this, (Messenger.__proto__ || Object.getPrototypeOf(Messenger)).call(this));

        _this.state = {
            currentUser: _UserStore2.default.getCurrentUser(),
            possibleFriends: _UserStore2.default.getPossibleFriends(),
            typeForm: null,
            errorLogin: false,
            errorPassword: false,
            errorEmail: false
        };
        _UserStore2.default.addListener('change', function () {
            _this.setState({
                possibleFriends: _UserStore2.default.getPossibleFriends(),
                currentUser: _UserStore2.default.getCurrentUser()
            });
        });
        return _this;
    }

    _createClass(Messenger, [{
        key: '_actionClick',
        value: function _actionClick(typeForm) {
            //console.log(typeForm);
            this.setState({ typeForm: typeForm });
        }
    }, {
        key: '_renderPanels',
        value: function _renderPanels() {
            if (!this.state.currentUser) {
                return null;
            }
            return _react2.default.createElement(
                'div',
                { className: 'Panels' },
                _react2.default.createElement(_InfoPanel2.default, null),
                _react2.default.createElement(_FriendPanel2.default, null),
                _react2.default.createElement(_MessagePanel2.default, null)
            );
        }
    }, {
        key: '_renderAuthForm',
        value: function _renderAuthForm() {
            return _react2.default.createElement(
                _Dialog2.default,
                {
                    modal: true,
                    header: '\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044C',
                    onAction: this._authUser.bind(this)
                },
                _react2.default.createElement(_Form2.default, {
                    ref: 'authForm',
                    fields: [{ label: 'Логин', id: 'login', error: this.state.errorLogin }, { label: 'Пароль', id: 'password', error: this.state.errorPassword }]
                }),
                _react2.default.createElement(
                    _Button2.default,
                    { onClick: this._actionClick.bind(this, 'registerForm') },
                    '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F'
                )
            );
        }
    }, {
        key: '_authUser',
        value: function _authUser() {
            this.setState({
                errorLogin: false,
                errorPassword: false
            });
            var data = this.refs.authForm.getData();
            var emptyField = false;
            for (var key in data) {
                if (!data[key]) {
                    var error = 'error' + key.charAt(0).toUpperCase() + key.slice(1);
                    switch (error) {
                        case 'errorLogin':
                            this.setState({ errorLogin: true });
                        case 'errorPassword':
                            this.setState({ errorPassword: true });
                    }
                    emptyField = true;
                }
            }
            if (!emptyField) {
                _UserActions2.default.getUser(data);
            }
        }
    }, {
        key: '_renderRegisterForm',
        value: function _renderRegisterForm() {
            return _react2.default.createElement(
                _Dialog2.default,
                {
                    modal: true,
                    header: '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F',
                    onAction: this._registerUser.bind(this)
                },
                _react2.default.createElement(_Form2.default, {
                    ref: 'registerForm',
                    fields: [{ label: 'Логин', id: 'login', error: this.state.errorLogin }, { label: 'Пароль', id: 'password', error: this.state.errorPassword }, { label: 'Email', id: 'email', error: this.state.errorEmail }]
                }),
                _react2.default.createElement(
                    _Button2.default,
                    { onClick: this._actionClick.bind(this, 'authForm') },
                    '\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F'
                )
            );
        }
    }, {
        key: '_registerUser',
        value: function _registerUser() {

            this.setState({
                errorLogin: false,
                errorPassword: false,
                errorEmail: false
            });

            var data = this.refs.registerForm.getData();
            var emptyField = false;
            for (var key in data) {
                if (!data[key]) {
                    var error = 'error' + key.charAt(0).toUpperCase() + key.slice(1);
                    switch (error) {
                        case 'errorLogin':
                            this.setState({ errorLogin: true });
                        case 'errorPassword':
                            this.setState({ errorPassword: true });
                        case 'errorEmail':
                            this.setState({ errorEmail: true });
                    }
                    emptyField = true;
                }
            }
            if (!emptyField) {
                _UserActions2.default.createUser(data);
            }

            //console.log(data);
        }
    }, {
        key: '_renderEditProfileForm',
        value: function _renderEditProfileForm() {
            var currentUser = this.state.currentUser;
            return _react2.default.createElement(
                _Dialog2.default,
                {
                    modal: true,
                    header: '\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0444\u0438\u043B\u044F',
                    onAction: this._updateUser.bind(this),
                    hasCancel: true
                },
                _react2.default.createElement(_Form2.default, {
                    ref: 'editProfileForm',
                    fields: [{ label: 'Логин', id: 'login', error: this.state.errorLogin }, { label: 'Пароль', id: 'password', error: this.state.errorPassword }, { label: 'Имя', id: 'firstname' }, { label: 'Фамилия', id: 'lastname' }, { label: 'Email', id: 'email', error: this.state.errorEmail }],
                    initialData: { login: currentUser.login, password: currentUser.password, firstname: currentUser.firstname, lastname: currentUser.lastname, email: currentUser.email }
                })
            );
        }
    }, {
        key: '_updateUser',
        value: function _updateUser(action) {
            this.setState({ typeForm: null });
            this.setState({
                errorLogin: false,
                errorPassword: false,
                errorEmail: false
            });
            if (action === 'dismiss') {
                return;
            }
            var data = this.refs.editProfileForm.getData();

            var emptyField = false;
            for (var key in data) {
                if (!data[key]) {
                    var error = 'error' + key.charAt(0).toUpperCase() + key.slice(1);
                    switch (error) {
                        case 'errorLogin':
                            this.setState({ errorLogin: true });emptyField = true;
                        case 'errorPassword':
                            this.setState({ errorPassword: true });emptyField = true;
                        case 'errorEmail':
                            this.setState({ errorEmail: true });emptyField = true;
                    }
                }
            }
            if (!emptyField) {
                data._id = this.state.currentUser._id;
                _UserActions2.default.updateUser(data);
                //setTimeout(UserActions.getUserById.bind(this, this.state.currentUser._id), 1000);
            }
        }
    }, {
        key: '_renderListPossibleFriend',
        value: function _renderListPossibleFriend() {
            var _this2 = this;

            var arrPossibleFriends = this.state.possibleFriends;
            //console.log(arrPossibleFriends);
            return _react2.default.createElement(
                _Dialog2.default,
                {
                    modal: true,
                    header: '\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0435 \u0434\u0440\u0443\u0437\u044C\u044F',
                    onAction: this._cancel.bind(this),
                    hasCancel: false
                },
                arrPossibleFriends.map(function (friend, idx) {
                    //console.log(friend);
                    return _react2.default.createElement(
                        'p',
                        null,
                        friend.firstname,
                        ' ',
                        friend.lastname,
                        ' ',
                        _react2.default.createElement(
                            _Button2.default,
                            { onClick: _this2._sendRequestAddToFriends.bind(_this2, friend) },
                            '+'
                        )
                    );
                })
            );
        }
    }, {
        key: '_cancel',
        value: function _cancel() {
            this.setState({ typeForm: null });
        }
    }, {
        key: '_sendRequestAddToFriends',
        value: function _sendRequestAddToFriends(possibleFriend) {
            console.log('-----_sendRequestAddToFriends: possibleFriend-----');
            console.log(possibleFriend);
            var currentUser = this.state.currentUser;
            console.log('-----_sendRequestAddToFriends: currentUser-----');
            console.log(currentUser);
            if (!possibleFriend.possibleFriends) {
                possibleFriend.possibleFriends = [];
            }
            possibleFriend.possibleFriends.push({ id: currentUser._id });
            _UserActions2.default.updateUser(possibleFriend);
        }
    }, {
        key: '_renderSearchFriendForm',
        value: function _renderSearchFriendForm() {
            var currentUser = this.state.currentUser;
            return _react2.default.createElement(
                _Dialog2.default,
                {
                    modal: true,
                    header: '\u041F\u043E\u0438\u0441\u043A \u0434\u0440\u0443\u0437\u0435\u0439',
                    onAction: this._searchFriend.bind(this),
                    hasCancel: true
                },
                _react2.default.createElement(_Form2.default, {
                    ref: 'addFriendForm',
                    fields: [{ label: 'Имя друга', id: 'search' }]
                })
            );
        }
    }, {
        key: '_searchFriend',
        value: function _searchFriend(action) {
            this.setState({ typeForm: null });
            if (action === 'dismiss') {
                return;
            }

            var data = this.refs.addFriendForm.getData();
            if (data) {
                _UserActions2.default.searchFriend(data);
                this.setState({ typeForm: 'listFriends' });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            //console.log(this.state.currentUser);
            return _react2.default.createElement(
                'div',
                { className: 'Messenger' },
                _react2.default.createElement(
                    'div',
                    { className: 'Panels' },
                    _react2.default.createElement(_InfoPanel2.default, { onEdit: this._actionClick.bind(this, 'editForm'), onAdd: this._actionClick.bind(this, 'searchFriendForm') }),
                    _react2.default.createElement(_FriendPanel2.default, null),
                    _react2.default.createElement(_MessagePanel2.default, null)
                ),
                this._renderBeginForm(),
                this._renderForm()
            );
        }
    }, {
        key: '_renderBeginForm',
        value: function _renderBeginForm() {
            if (this.state.currentUser._id) {
                return null;
            }
            switch (this.state.typeForm) {
                case 'editForm':
                    return this._renderEditProfileForm();
                case 'registerForm':
                    return this._renderRegisterForm();
                case 'authForm':
                    return this._renderAuthForm();
                default:
                    return this._renderAuthForm();
            }
        }
    }, {
        key: '_renderForm',
        value: function _renderForm() {
            switch (this.state.typeForm) {
                case 'listFriends':
                    return this._renderListPossibleFriend();
                case 'searchFriendForm':
                    return this._renderSearchFriendForm();
                case 'editForm':
                    return this._renderEditProfileForm();
                default:
                    return null;
            }
        }
    }]);

    return Messenger;
}(_react.Component);

exports.default = Messenger;