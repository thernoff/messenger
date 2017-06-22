'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('../../../../etc/config.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    test: function test() {
        return _axios2.default.get('http://localhost:8080/users');
    },
    listUsers: function listUsers() {
        return _axios2.default.get(_config.apiPrefix + '/users');
    },
    getUser: function getUser(login, password) {
        //console.log(login);
        //console.log(password);
        return _axios2.default.post(_config.apiPrefix + '/user/get/', { login: login, password: password });
    },
    getUserById: function getUserById(id) {
        return _axios2.default.get(_config.apiPrefix + '/user/get/' + id);
    },
    createUser: function createUser(data) {
        return _axios2.default.post(_config.apiPrefix + '/user/create/', data);
    },
    updateUser: function updateUser(data) {
        return _axios2.default.post(_config.apiPrefix + '/user/update/', data);
    },
    searchUser: function searchUser(search) {
        return _axios2.default.get(_config.apiPrefix + '/user/search/' + search);
    },
    deleteNote: function deleteNote(noteId) {
        return _axios2.default.delete(_config.apiPrefix + '/user/' + noteId);
    }
};