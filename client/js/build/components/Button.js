'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//import React from 'react';
//const PropTypes = React.PropTypes;


var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Для данного компонента не требуется поддержки состояния, поэтому
// тело функции станет заменой метода render()
function Button(props) {
    var cssclasses = (0, _classnames2.default)('Button', props.className);
    return props.href ? _react2.default.createElement('a', _extends({}, props, { className: cssclasses })) : _react2.default.createElement('button', _extends({}, props, { className: cssclasses }));
}

//Можно функцию записать так
/*const Button = props =>
    props.href
        ? <a {...props} className={classNames('Button',
            props.className)} />
        : <button {...props} className={classNames('Button',
            props.className)} />*/

Button.propTypes = {
    href: _react.PropTypes.string
};

exports.default = Button;