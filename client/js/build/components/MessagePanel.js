'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

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

var MessagePanel = function (_Component) {
    _inherits(MessagePanel, _Component);

    function MessagePanel(props) {
        _classCallCheck(this, MessagePanel);

        var _this = _possibleConstructorReturn(this, (MessagePanel.__proto__ || Object.getPrototypeOf(MessagePanel)).call(this, props));

        _this.state = {
            currentUser: _UserStore2.default.getCurrentUser(),
            activeFriend: _UserStore2.default.getActiveFriend(),
            dialog: _UserStore2.default.getDialog()
        };
        _UserStore2.default.addListener('change', function () {
            _this.setState({
                currentUser: _UserStore2.default.getCurrentUser(),
                dialog: _UserStore2.default.getDialog()
            });
        });

        _UserStore2.default.addListener('changeActiveFriend', function () {
            _this.setState({
                activeFriend: _UserStore2.default.getActiveFriend(),
                dialog: _UserStore2.default.getDialog()
            });
        });
        return _this;
    }

    _createClass(MessagePanel, [{
        key: '_sendMessage',
        value: function _sendMessage() {
            var objMessage = this.refs.sendMessageForm.getData();
            var currentUser = this.state.currentUser;
            var activeFriend = this.state.activeFriend;
            //console.log('objMessage: ', objMessage);
            //console.log('currentUser: ', currentUser);
            //console.log('activeFriend: ', activeFriend);
            if (activeFriend) {
                _UserActions2.default.sendMessage(currentUser, activeFriend, objMessage);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'MessagePanel' },
                _react2.default.createElement(
                    'div',
                    { className: 'chat' },
                    this.state.dialog.map(function (objMessage) {
                        var name = void 0;
                        var message = void 0;
                        var currentUser = _this2.state.currentUser;
                        if (objMessage.ownerId === currentUser._id) {
                            name = _this2.state.currentUser.firstname + ' ' + _this2.state.currentUser.lastname;
                            return _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { style: { float: 'left' } },
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        name,
                                        ': ',
                                        objMessage.text
                                    )
                                ),
                                _react2.default.createElement('div', { style: { clear: 'both' } })
                            );
                        } else {
                            name = _this2.state.activeFriend.firstname + ' ' + _this2.state.activeFriend.lastname;
                            return _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { style: { float: 'right' } },
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        objMessage.text,
                                        ': ',
                                        name
                                    )
                                ),
                                _react2.default.createElement('div', { style: { clear: 'both' } })
                            );
                        }
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'footerMessagePanel' },
                    _react2.default.createElement(
                        'div',
                        { style: { float: 'left' } },
                        _react2.default.createElement(_Form2.default, {
                            ref: 'sendMessageForm',
                            fields: [{ label: 'Введите текст сообщения', type: 'text', id: 'message' }]
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: { float: 'right' } },
                        _react2.default.createElement(
                            _Button2.default,
                            { onClick: this._sendMessage.bind(this) },
                            '\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C'
                        )
                    ),
                    _react2.default.createElement('div', { style: { clear: 'both' } })
                )
            );
        }
    }]);

    return MessagePanel;
}(_react.Component);

exports.default = MessagePanel;