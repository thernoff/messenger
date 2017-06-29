'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('../../../../etc/config.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    createUser: function createUser(data) {
        return _axios2.default.post(_config.apiPrefix + '/user/create/', data);
    },
    listUsers: function listUsers() {
        return _axios2.default.get(_config.apiPrefix + '/users');
    },
    getUser: function getUser(login, password) {
        return _axios2.default.post(_config.apiPrefix + '/user/get/', { login: login, password: password });
    },
    getPossibleFriends: function getPossibleFriends(arrObjIdsPossibleFriends) {
        return _axios2.default.post(_config.apiPrefix + '/possible/get/', arrObjIdsPossibleFriends);
    },
    getFriends: function getFriends(arrObjIdsFriends) {
        return _axios2.default.post(_config.apiPrefix + '/friends/get/', arrObjIdsFriends);
    },
    getUserById: function getUserById(id) {
        return _axios2.default.get(_config.apiPrefix + '/user/get/' + id);
    },
    updateUser: function updateUser(data) {
        return _axios2.default.post(_config.apiPrefix + '/user/update/', data);
    },
    addToFriends: function addToFriends(currentUser, possibleFriend) {
        return _axios2.default.post(_config.apiPrefix + '/friend/add/', { currentUser: currentUser, possibleFriend: possibleFriend });
    },
    addToPossibleFriends: function addToPossibleFriends(currentUser, possibleFriend) {
        return _axios2.default.post(_config.apiPrefix + '/possible/add/', { currentUser: currentUser, possibleFriend: possibleFriend });
    },
    searchUser: function searchUser(search) {
        return _axios2.default.get(_config.apiPrefix + '/user/search/' + search);
    },
    deleteUser: function deleteUser(userId) {
        return _axios2.default.delete(_config.apiPrefix + '/user/' + userId);
    }
};