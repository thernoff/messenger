'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _UserStore = require('../flux/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfoPanel = function (_Component) {
    _inherits(InfoPanel, _Component);

    function InfoPanel(props) {
        _classCallCheck(this, InfoPanel);

        var _this = _possibleConstructorReturn(this, (InfoPanel.__proto__ || Object.getPrototypeOf(InfoPanel)).call(this, props));

        _this.state = {
            currentUser: _UserStore2.default.getCurrentUser(),
            possibleFriends: _UserStore2.default.getPossibleFriends(),
            mainImg: _UserStore2.default.getMainImg()
        };
        _UserStore2.default.addListener('change', function () {
            //let currentUser = UserStore.getCurrentUser();
            //console.log(currentUser);
            _this.setState({
                currentUser: _UserStore2.default.getCurrentUser(),
                possibleFriends: _UserStore2.default.getPossibleFriends(),
                mainImg: _UserStore2.default.getMainImg()
            });
        });
        return _this;
    }

    _createClass(InfoPanel, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'InfoPanel' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-3' },
                        _react2.default.createElement(_Avatar2.default, {
                            size: 'medium',
                            form: 'round',
                            src: this.state.mainImg ? './avatars/' + this.state.mainImg : this.state.mainImg,
                            onClick: this.props.onUploadPhoto
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-7' },
                        _react2.default.createElement(
                            'h2',
                            null,
                            this.state.currentUser.firstname,
                            ' ',
                            this.state.currentUser.lastname,
                            ' [',
                            this.state.currentUser.login,
                            ']'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-2' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                _Button2.default,
                                { className: 'info-panel', onClick: this.props.onEdit },
                                _react2.default.createElement('i', { className: 'fa fa-pencil-square-o', 'aria-hidden': 'true' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                _Button2.default,
                                { className: 'info-panel', onClick: this.props.onAdd },
                                _react2.default.createElement('i', { className: 'fa fa-search-plus', 'aria-hidden': 'true' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                _Button2.default,
                                { className: 'info-panel', onClick: this.props.onNew },
                                _react2.default.createElement('i', { className: 'fa fa-user', 'aria-hidden': 'true' })
                            ),
                            this.state.possibleFriends && this.state.possibleFriends.length > 0 ? _react2.default.createElement(
                                'span',
                                { className: 'num-possible-friends' },
                                '+',
                                this.state.possibleFriends.length
                            ) : _react2.default.createElement('span', null)
                        )
                    )
                )
            );
        }
    }]);

    return InfoPanel;
}(_react.Component);

exports.default = InfoPanel;