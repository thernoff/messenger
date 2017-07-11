'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _UserStore = require('../flux/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _UserActions = require('../flux/UserActions');

var _UserActions2 = _interopRequireDefault(_UserActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FriendPanel = function (_Component) {
    _inherits(FriendPanel, _Component);

    function FriendPanel(props) {
        _classCallCheck(this, FriendPanel);

        var _this = _possibleConstructorReturn(this, (FriendPanel.__proto__ || Object.getPrototypeOf(FriendPanel)).call(this, props));

        _this.state = {
            possibleFriends: _UserStore2.default.getPossibleFriends(),
            currentUser: _UserStore2.default.getCurrentUser(),
            friends: _UserStore2.default.getFriends(),
            activeFriend: _UserStore2.default.getActiveFriend(),
            filterFriends: _UserStore2.default.getFilterFriends(),
            minFriendId: 0,
            maxFriendId: 4
        };
        _UserStore2.default.addListener('change', function () {
            //console.log(UserStore.getPossibleFriends());
            _this.setState({
                possibleFriends: _UserStore2.default.getPossibleFriends(),
                currentUser: _UserStore2.default.getCurrentUser(),
                friends: _UserStore2.default.getFriends()
            });
        });
        _UserStore2.default.addListener('changeActiveFriend', function () {
            _this.setState({
                friends: _UserStore2.default.getFriends(),
                activeFriend: _UserStore2.default.getActiveFriend()
            });
        });
        _UserStore2.default.addListener('filterFriends', function () {
            _this.setState({
                friends: _UserStore2.default.getFilterFriends(),
                //filterFriends: UserStore.getFilterFriends(),
                activeFriend: _UserStore2.default.getActiveFriend(),
                minFriendId: 0,
                maxFriendId: 4
            });
        });
        return _this;
    }

    _createClass(FriendPanel, [{
        key: '_moveLeftListFriends',
        value: function _moveLeftListFriends() {
            var minFriendId = this.state.minFriendId;
            var maxFriendId = this.state.maxFriendId;
            console.log('minFriendId: ', minFriendId);
            console.log('maxFriendId: ', maxFriendId);
            if (minFriendId - 1 < 0) return;
            this.setState({
                minFriendId: --minFriendId,
                maxFriendId: --maxFriendId
            });
        }
    }, {
        key: '_moveRightListFriends',
        value: function _moveRightListFriends() {
            var minFriendId = this.state.minFriendId;
            var maxFriendId = this.state.maxFriendId;
            var countFriends = this.state.friends.length;
            console.log('minFriendId: ', minFriendId);
            console.log('maxFriendId: ', maxFriendId);
            if (maxFriendId + 1 >= countFriends) return;
            this.setState({
                minFriendId: ++minFriendId,
                maxFriendId: ++maxFriendId
            });
        }
    }, {
        key: '_renderFilterPanel',
        value: function _renderFilterPanel() {
            return _react2.default.createElement(
                'div',
                { className: 'FilterPanel' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-7' },
                        _react2.default.createElement(
                            _Button2.default,
                            { className: 'friend-panel', onClick: _UserActions2.default.showAllFriends.bind(_UserActions2.default) },
                            '\u0412\u0441\u0435'
                        ),
                        _react2.default.createElement(
                            _Button2.default,
                            { className: 'friend-panel', onClick: _UserActions2.default.showOnlineFriends.bind(_UserActions2.default) },
                            '\u041E\u043D\u043B\u0430\u0439\u043D'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-5' },
                        _react2.default.createElement(
                            'div',
                            { className: 'WhinepadToolbarSearch' },
                            _react2.default.createElement('input', {
                                onChange: _UserActions2.default.filterSearch.bind(_UserActions2.default),
                                onFocus: _UserActions2.default.startFilterSearch.bind(_UserActions2.default)
                            })
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'FriendPanel' },
                this._renderFilterPanel(),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-1' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _Button2.default,
                                { className: 'friend-panel-arrow left', onClick: this._moveLeftListFriends.bind(this) },
                                ' ',
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    '\u2039'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-10' },
                        _react2.default.createElement(
                            'div',
                            { className: 'avatar-list' },
                            this.state.friends.length > 0 ? this.state.friends.map(function (friend, idx) {
                                //console.log('this.state.activeFriend:', this.state.activeFriend);
                                //console.log('friend:', friend);
                                //console.log((this.state.activeFriend !== null && this.state.activeFriend._id === friend._id));
                                var pos = _this2.state.currentUser.friends.map(function (friend) {
                                    return friend.id;
                                }).indexOf(friend._id);
                                //console.log('this.state.currentUser.friends[pos]:', this.state.currentUser.friends);
                                //console.log('pos:', pos);
                                //console.log('idx:', idx);
                                var numNewMessages = _this2.state.currentUser.friends[pos].numNewMessages;
                                if (idx >= _this2.state.minFriendId && idx <= _this2.state.maxFriendId) {
                                    return _react2.default.createElement(_Avatar2.default, {
                                        key: idx,
                                        active: _this2.state.activeFriend !== null && _this2.state.activeFriend._id === friend._id,
                                        size: 'small',
                                        form: 'round',
                                        online: friend.online,
                                        src: friend.mainImg ? 'avatars/' + friend._id + '/' + friend.mainImg : 'avatars/no-avatar.jpg',
                                        title: friend.firstname + ' ' + friend.lastname,
                                        alt: friend.login,
                                        id: friend._id,
                                        numNewMessages: numNewMessages,
                                        onClick: function onClick() {
                                            _UserActions2.default.setActiveFriend(friend);
                                            //UserStore.setActiveFriend(friend);
                                        }
                                    });
                                }
                            }, this) : _react2.default.createElement(
                                'div',
                                { className: 'friend-panel-info' },
                                ' \u0414\u0440\u0443\u0437\u044C\u044F \u0441 \u0437\u0430\u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430\u043C\u0438 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442.'
                            )
                            //(this.state.possibleFriends.length > 0) 
                            //? this.state.possibleFriends.length
                            //: this.state.possibleFriends.length

                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-1' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _Button2.default,
                                { className: 'friend-panel-arrow right', onClick: this._moveRightListFriends.bind(this) },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    '\u203A'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement('div', { style: { clear: 'both' } })
                )
            );
        }
    }]);

    return FriendPanel;
}(_react.Component);

exports.default = FriendPanel;