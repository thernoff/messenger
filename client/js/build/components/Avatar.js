'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Avatar = function (_Component) {
    _inherits(Avatar, _Component);

    function Avatar(props) {
        _classCallCheck(this, Avatar);

        var _this = _possibleConstructorReturn(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).call(this, props));

        _this.state = {
            src: props.src,
            size: props.size,
            form: props.form,
            online: true
        };
        return _this;
    }

    _createClass(Avatar, [{
        key: 'render',
        value: function render() {
            var online = this.state.online;
            return _react2.default.createElement(
                'div',
                { className: 'Avatar' },
                _react2.default.createElement('img', { className: (0, _classnames2.default)(this.state.size, this.state.form, { 'online': online, 'offline': !online }),
                    src: this.state.src
                })
            );
        }
    }]);

    return Avatar;
}(_react.Component);

Avatar.propTypes = {
    size: _react.PropTypes.string,
    src: _react.PropTypes.string,
    form: _react.PropTypes.string,
    online: _react.PropTypes.bool
};

Avatar.defaultProps = {
    form: 'round',
    online: true
};

exports.default = Avatar;