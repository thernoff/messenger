'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { apiPrefix } from '../../../../etc/config.json';
var apiPrefix = location.hostname === 'localhost' ? 'http://localhost:8080' : location.href;

if (apiPrefix.lastIndexOf('/') === apiPrefix.length - 1) {
    apiPrefix = apiPrefix.substr(0, apiPrefix.length - 1);
}
console.log('apiPrefix', apiPrefix);
exports.default = {
    createUser: function createUser(data) {
        return _axios2.default.post(apiPrefix + '/user/create/', data);
    },
    listUsers: function listUsers() {
        return _axios2.default.get(apiPrefix + '/users');
    },
    getUser: function getUser(login, password) {
        return _axios2.default.post(apiPrefix + '/user/get/', { login: login, password: password });
    },
    getPossibleFriends: function getPossibleFriends(arrObjIdsPossibleFriends) {
        return _axios2.default.post(apiPrefix + '/possible/get/', arrObjIdsPossibleFriends);
    },
    getFriends: function getFriends(arrObjIdsFriends) {
        return _axios2.default.post(apiPrefix + '/friends/get/', arrObjIdsFriends);
    },
    getUserById: function getUserById(id) {
        return _axios2.default.get(apiPrefix + '/user/get/' + id);
    },
    updateUser: function updateUser(data) {
        return _axios2.default.post(apiPrefix + '/user/update/', data);
    },
    addToFriends: function addToFriends(currentUser, possibleFriend) {
        return _axios2.default.post(apiPrefix + '/friend/add/', { currentUser: currentUser, possibleFriend: possibleFriend });
    },
    addToPossibleFriends: function addToPossibleFriends(currentUser, possibleFriend) {
        return _axios2.default.post(apiPrefix + '/possible/add/', { currentUser: currentUser, possibleFriend: possibleFriend });
    },
    searchUser: function searchUser(search) {
        return _axios2.default.get(apiPrefix + '/user/search/' + search);
    },
    deleteUser: function deleteUser(userId) {
        return _axios2.default.delete(apiPrefix + '/user/' + userId);
    },
    sendMessage: function sendMessage(currentUser, activeFriend, objMessage) {
        return _axios2.default.post(apiPrefix + '/message/send/', { currentUser: currentUser, activeFriend: activeFriend, objMessage: objMessage });
    },
    resetNumNewMessage: function resetNumNewMessage(currentUser, activeFriend) {
        return _axios2.default.post(apiPrefix + '/message/reset/', { currentUserId: currentUser._id, activeFriendId: activeFriend._id });
    },
    uploadPhoto: function uploadPhoto(data) {
        return _axios2.default.put(apiPrefix + '/upload/server/', data);
    }
};