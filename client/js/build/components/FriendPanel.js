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
            activeFriend: _UserStore2.default.getActiveFriend()
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
        return _this;
    }

    _createClass(FriendPanel, [{
        key: '_renderFilterPanel',
        value: function _renderFilterPanel() {
            return _react2.default.createElement(
                'div',
                { className: 'FilterPanel' },
                _react2.default.createElement(
                    'div',
                    { style: { float: 'left' } },
                    _react2.default.createElement(
                        _Button2.default,
                        null,
                        '\u0412\u0441\u0435'
                    ),
                    _react2.default.createElement(
                        _Button2.default,
                        null,
                        '\u041E\u043D\u043B\u0430\u0439\u043D'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: { float: 'right' } },
                    _react2.default.createElement('input', null)
                ),
                _react2.default.createElement('div', { style: { clear: 'both' } })
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
                    null,
                    _react2.default.createElement(
                        'div',
                        { style: { float: 'left', width: '30px', fontSize: '40px', textAlign: 'center' } },
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u2039'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: { float: 'right', width: '30px', fontSize: '40px', textAlign: 'center' } },
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u203A'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'friend' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            this.state.friends.map(function (friend) {
                                //console.log('this.state.activeFriend:', this.state.activeFriend);
                                //console.log('friend:', friend);
                                //console.log((this.state.activeFriend !== null && this.state.activeFriend._id === friend._id));
                                var test = _this2.state.activeFriend !== null ? _this2.state.activeFriend.login : _this2.state.activeFriend;
                                return _react2.default.createElement(_Avatar2.default, {
                                    active: _this2.state.activeFriend !== null && _this2.state.activeFriend._id === friend._id,
                                    test: test,
                                    size: 'small',
                                    form: 'round',
                                    src: friend.mainImg,
                                    title: friend.firstname + ' ' + friend.lastname,
                                    alt: friend.login,
                                    id: friend._id,
                                    onClick: function onClick() {
                                        _UserStore2.default.setActiveFriend(friend);
                                    }
                                });
                            }, this)
                            //(this.state.possibleFriends.length > 0) 
                            //? this.state.possibleFriends.length
                            //: this.state.possibleFriends.length

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