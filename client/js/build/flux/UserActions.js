'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('../api/api');

var _api2 = _interopRequireDefault(_api);

var _UserStore = require('./UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserActions = {
    loadUsers: function loadUsers() {
        var data = _api2.default.listUsers();
    },
    createUser: function createUser(user) {
        _api2.default.createUser(user).then(function (res) {
            _UserStore2.default.setUser(res.data);
        }).catch(function (err) {
            return console.error(err);
        });
    },
    updateUser: function updateUser(user) {
        _api2.default.updateUser(user).then(function (res) {
            console.log('-----UserActions.updateUser-----');
            console.log('-----пришел результат с сервера-----');
            console.log(res.data);
            var currentUser = _UserStore2.default.getCurrentUser();
            if (currentUser._id === user._id) {
                _UserStore2.default.setUser(res.data);
            }
        }).catch(function (err) {
            return console.error(err);
        });
    },
    sendRequestAddToFriends: function sendRequestAddToFriends(currentUserId, possibleFriendId) {
        _api2.default.sendRequestAddToFriends(currentUserId, possibleFriendId).then(function (res) {
            console.log('-----UserActions.sendRequestAddToFriends-----');
            console.log('-----пришел результат с сервера-----');
            console.log(res.data);
        }).catch(function (err) {
            return console.error(err);
        });
    },


    //Получаем объект User из базы даных и сохраняем его в Хранилище
    getUser: function getUser(data) {
        var login = data.login;
        var password = data.password;
        _api2.default.getUser(login, password).then(function (res) {
            console.log('-----UserActions.getUser-----');
            console.log('-----пришел результат с сервера-----');
            console.log(res.data);
            _UserStore2.default.setUser(res.data);
        }).catch(function (err) {
            return console.error(err);
        });
    },
    searchFriend: function searchFriend(data) {
        var search = data.search;
        _api2.default.searchUser(search).then(function (res) {
            //console.log(res.data);
            _UserStore2.default.setPossibleFriends(res.data);
        }).catch(function (err) {
            return console.error(err);
        });
    },
    getUserById: function getUserById(id) {
        _api2.default.getUserById(id).then(function (res) {
            console.log('-----UserActions.getUser-----');
            console.log('-----пришел результат с сервера-----');
            console.log(res.data);
            _UserStore2.default.setUser(res.data);
        }).catch(function (err) {
            return console.error(err);
        });
    },
    deleteUser: function deleteUser(userId) {
        var _this = this;

        _api2.default.deleteUser(noteId).then(function () {
            return _this.loadUsers();
        }).catch(function (err) {
            return console.error(err);
        });
    }
};

exports.default = UserActions;