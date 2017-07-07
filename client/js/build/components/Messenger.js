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
            searchFriends: _UserStore2.default.getSearchFriends(),
            possibleFriends: _UserStore2.default.getPossibleFriends(),
            typeForm: null,
            errorLogin: false,
            errorPassword: false,
            errorEmail: false
        };
        _UserStore2.default.addListener('change', function () {
            _this.setState({
                possibleFriends: _UserStore2.default.getPossibleFriends(),
                searchFriends: _UserStore2.default.getSearchFriends(),
                currentUser: _UserStore2.default.getCurrentUser()
            });
        });
        return _this;
    }

    _createClass(Messenger, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            socket.on('newPossibleFriend', _UserActions2.default.getUserById.bind(_UserActions2.default));
            socket.on('newMessage', _UserActions2.default.getDialog.bind(_UserActions2.default));
            socket.on('online', _UserActions2.default.setOnlineFriend.bind(_UserActions2.default));
            socket.on('offline', _UserActions2.default.setOfflineFriend.bind(_UserActions2.default));
        }

        //Метод отображающий форму авторизации

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
        //Метод отображающий форму регистрации

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
            }
        }

        //Метод отображает форму поиска Пользователя

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
                console.log('Messenger._searchFriend data:', data);
                _UserActions2.default.searchFriend(data);
                this.setState({ typeForm: 'listSearchFriends' });
            }
        }

        //Метод отображает список пользователей, желающих добавиться в друзья

    }, {
        key: '_renderUploadPhotoForm',
        value: function _renderUploadPhotoForm() {
            var arrPossibleFriends = this.state.possibleFriends;
            return _react2.default.createElement(
                _Dialog2.default,
                {
                    modal: true,
                    header: '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438',
                    onAction: this._cancel.bind(this),
                    hasCancel: false
                },
                _react2.default.createElement(
                    'form',
                    { id: 'uploadForm', onsubmit: 'return false;' },
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement('input', { id: 'file', type: 'file', className: 'form-control' })
                    )
                ),
                _react2.default.createElement(
                    _Button2.default,
                    { onClick: this._uploadPhoto.bind(this) },
                    'Upload'
                )
            );
        }
    }, {
        key: '_uploadPhoto',
        value: function _uploadPhoto() {
            //let uploadForm = document.getElementById('uploadForm');
            var data = new FormData();
            var currentUser = _UserStore2.default.getCurrentUser();
            data.append('currentUserId', currentUser._id);
            data.append('photo', document.getElementById('file').files[0]);
            _UserActions2.default.uploadPhoto(data);
        }

        //Метод отображает список пользователей, желающих добавиться в друзья

    }, {
        key: '_renderNewFriendList',
        value: function _renderNewFriendList() {
            var _this2 = this;

            var arrPossibleFriends = this.state.possibleFriends;
            return _react2.default.createElement(
                _Dialog2.default,
                {
                    modal: true,
                    header: '\u041D\u043E\u0432\u044B\u0435 \u0434\u0440\u0443\u0437\u044C\u044F',
                    onAction: this._cancel.bind(this),
                    hasCancel: false
                },
                arrPossibleFriends.map(function (friend, idx) {
                    return _react2.default.createElement(
                        'p',
                        null,
                        friend.firstname,
                        ' ',
                        friend.lastname,
                        ' ',
                        _react2.default.createElement(
                            _Button2.default,
                            { onClick: _this2._addToFriends.bind(_this2, friend) },
                            '+'
                        )
                    );
                })
            );
        }
        //Метод добавляет в друзья пользователей, приславшие заявки на добавление

    }, {
        key: '_addToFriends',
        value: function _addToFriends(possibleFriend) {
            var currentUser = this.state.currentUser;
            //Проверяем наличие объекта possibleFriend в массиве currentUser.friends
            var position = currentUser.friends.map(function (friend) {
                return friend.id;
            }).indexOf(possibleFriend._id);
            if (position < 0) {
                //console.log('CURRENTUSER: ', currentUser);
                _UserActions2.default.addToFriends(currentUser, possibleFriend);
            } else {
                console.log('Пользователь уже добавлен.');
            }
        }
    }, {
        key: '_renderSearchPossibleFriendList',
        value: function _renderSearchPossibleFriendList() {
            var _this3 = this;

            var arrSearchFriends = this.state.searchFriends ? this.state.searchFriends : [];
            return _react2.default.createElement(
                _Dialog2.default,
                {
                    modal: true,
                    header: '\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0435 \u0434\u0440\u0443\u0437\u044C\u044F',
                    onAction: this._cancel.bind(this),
                    hasCancel: false
                },
                arrSearchFriends.length > 0 ? arrSearchFriends.map(function (friend, idx) {
                    console.log('FRIEND', friend);
                    return _react2.default.createElement(
                        'p',
                        null,
                        friend.firstname,
                        ' ',
                        friend.lastname,
                        ' ',
                        _react2.default.createElement(
                            _Button2.default,
                            { onClick: _this3._sendRequestAddToFriends.bind(_this3, friend) },
                            '+'
                        )
                    );
                }) : _react2.default.createElement(
                    'p',
                    null,
                    '\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0443\u0441\u0442'
                )
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
            var currentUser = this.state.currentUser;
            _UserActions2.default.addToPossibleFriends(currentUser, possibleFriend);
        }
    }, {
        key: '_actionClick',
        value: function _actionClick(typeForm) {
            this.setState({ typeForm: typeForm });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'Messenger' },
                _react2.default.createElement(
                    'div',
                    { className: 'Panels' },
                    _react2.default.createElement(_InfoPanel2.default, {
                        onUploadPhoto: this._actionClick.bind(this, 'uploadPhotoForm'),
                        onEdit: this._actionClick.bind(this, 'editForm'),
                        onAdd: this._actionClick.bind(this, 'searchFriendForm'),
                        onNew: this._actionClick.bind(this, 'newFriendsList')
                    }),
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
                case 'uploadPhotoForm':
                    return this._renderUploadPhotoForm();
                case 'newFriendsList':
                    return this._renderNewFriendList();
                case 'listSearchFriends':
                    return this._renderSearchPossibleFriendList();
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