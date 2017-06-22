'use strict';

var _MessagePanel = require('./components/MessagePanel');

var _MessagePanel2 = _interopRequireDefault(_MessagePanel);

var _FriendPanel = require('./components/FriendPanel');

var _FriendPanel2 = _interopRequireDefault(_FriendPanel);

var _InfoPanel = require('./components/InfoPanel');

var _InfoPanel2 = _interopRequireDefault(_InfoPanel);

var _Avatar = require('./components/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Dialog = require('./components/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Actions = require('./components/Actions');

var _Actions2 = _interopRequireDefault(_Actions);

var _Form = require('./components/Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormInput = require('./components/FormInput');

var _FormInput2 = _interopRequireDefault(_FormInput);

var _Rating = require('./components/Rating');

var _Rating2 = _interopRequireDefault(_Rating);

var _Suggest = require('./components/Suggest');

var _Suggest2 = _interopRequireDefault(_Suggest);

var _Button = require('./components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Logo = require('./components/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    'div',
    { style: { padding: '20px' } },
    _react2.default.createElement(
        'h1',
        null,
        'Component discoverer'
    ),
    _react2.default.createElement(
        'h2',
        null,
        'MessagePanel'
    ),
    _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_MessagePanel2.default, null)
    ),
    _react2.default.createElement(
        'h2',
        null,
        'FriendPanel'
    ),
    _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FriendPanel2.default, null)
    ),
    _react2.default.createElement(
        'h2',
        null,
        'InfoPanel'
    ),
    _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_InfoPanel2.default, { username: '\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 \u0421\u043C\u0438\u0440\u043D\u043E\u0432' })
    ),
    _react2.default.createElement(
        'h2',
        null,
        'Avatar'
    ),
    _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Avatar2.default, { size: 'small', form: 'round', src: './avatars/aHr3Bhk5.jpg' })
    ),
    _react2.default.createElement(
        'h2',
        null,
        'Logo'
    ),
    _react2.default.createElement(
        'div',
        { style: { display: 'inline-block', background: 'purple' } },
        _react2.default.createElement(_Logo2.default, null)
    ),
    _react2.default.createElement(
        'h2',
        null,
        'Buttons'
    ),
    _react2.default.createElement(
        'div',
        null,
        'Button with onClick: ',
        _react2.default.createElement(
            _Button2.default,
            { onClick: function onClick() {
                    return alert('ouch');
                } },
            'Click me'
        )
    ),
    _react2.default.createElement(
        'div',
        null,
        'A link: ',
        _react2.default.createElement(
            _Button2.default,
            { href: 'http://reactjs.com' },
            'Follow me'
        )
    ),
    _react2.default.createElement(
        'div',
        null,
        'Custom class name: ',
        _react2.default.createElement(
            _Button2.default,
            { className: 'custom' },
            'I do nothing'
        )
    ),
    _react2.default.createElement(
        'h2',
        null,
        'Suggest'
    ),
    _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Suggest2.default, { defaultValue: 'Select option', options: ['eenie', 'meenie', 'miney', 'mo'] })
    ),
    _react2.default.createElement(
        'h2',
        null,
        'Rating'
    ),
    _react2.default.createElement(
        'div',
        null,
        'No initial value: ',
        _react2.default.createElement(_Rating2.default, null)
    ),
    _react2.default.createElement(
        'div',
        null,
        'Initial value 4: ',
        _react2.default.createElement(_Rating2.default, { defaultValue: 4 })
    ),
    _react2.default.createElement(
        'div',
        null,
        'This one goes to 11: ',
        _react2.default.createElement(_Rating2.default, { max: 11 })
    ),
    _react2.default.createElement(
        'div',
        null,
        'Read-only: ',
        _react2.default.createElement(_Rating2.default, { readonly: true, defaultValue: 3 })
    ),
    _react2.default.createElement(
        'h2',
        null,
        'Form inputs'
    ),
    _react2.default.createElement(
        'table',
        null,
        _react2.default.createElement(
            'tbody',
            null,
            _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    'Vanilla input'
                ),
                ' // \u041E\u0431\u044B\u0447\u043D\u044B\u0439 \u0432\u0432\u043E\u0434',
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(_FormInput2.default, null)
                )
            ),
            _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    'Prefilled'
                ),
                ' // \u0421 \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435\u043C',
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(_FormInput2.default, { defaultValue: 'it\'s like a default' })
                )
            ),
            _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    'Year'
                ),
                ' // \u0413\u043E\u0434',
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(_FormInput2.default, { type: 'year' })
                )
            ),
            _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    'Rating'
                ),
                ' // \u0420\u0435\u0439\u0442\u0438\u043D\u0433',
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(_FormInput2.default, { type: 'rating', defaultValue: 4 })
                )
            ),
            _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    'Suggest'
                ),
                ' // \u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435',
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(_FormInput2.default, {
                        type: 'suggest',
                        options: ['red', 'green', 'blue'],
                        defaultValue: 'green' })
                )
            ),
            _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    'Vanilla textarea'
                ),
                ' // \u041E\u0431\u044B\u0447\u043D\u0430\u044F \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C',
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(_FormInput2.default, { type: 'text' })
                )
            )
        )
    ),
    _react2.default.createElement(
        'h2',
        null,
        'Form'
    ),
    _react2.default.createElement(_Form2.default, {
        fields: [{ label: 'Rating', type: 'rating', id: 'rateme' }, { label: 'Greetings', id: 'freetext' }],
        initialData: { rateme: 4, freetext: 'Hello' } }),
    _react2.default.createElement(
        'h2',
        null,
        'Form readonly'
    ),
    _react2.default.createElement(_Form2.default, {
        fields: [{ label: 'Rating', type: 'rating', id: 'rateme' }, { label: 'Greetings', id: 'freetext' }],
        initialData: { rateme: 4, freetext: 'Hello' },
        readonly: true }),
    _react2.default.createElement(
        'h2',
        null,
        'Actions'
    ),
    _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Actions2.default, { onAction: function onAction(type) {
                return alert(type);
            } })
    ),
    _react2.default.createElement(
        _Dialog2.default,
        {
            header: 'Out-of-the-box example',
            onAction: function onAction(type) {
                return alert(type);
            } },
        'Hello, dialog!'
    ),
    _react2.default.createElement(
        _Dialog2.default,
        {
            header: 'No cancel, custom button',
            hasCancel: false,
            confirmLabel: 'Whatever',
            onAction: function onAction(type) {
                return alert(type);
            } },
        'Anything goes here, see:',
        _react2.default.createElement(
            _Button2.default,
            null,
            'A button'
        )
    )
), document.getElementById('pad'));