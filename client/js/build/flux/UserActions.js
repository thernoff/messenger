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
        var _this = this;

        _api2.default.updateUser(user).then(function (res) {
            console.log('-----UserActions.updateUser-----');
            console.log('-----пришел результат с сервера-----');
            console.log(res.data);
            var currentUser = _UserStore2.default.getCurrentUser();
            if (currentUser._id === user._id) {
                _this._setPossibleFriends(res.data.possibleFriends);
                _UserStore2.default.setUser(res.data);
            } else {
                socket.emit('update', { currentUserId: currentUser._id, possibleFriendId: user._id });
                //this._setPossibleFriends(res.data.possibleFriends);
                //UserStore.setUser(res.data);
            }
        }).catch(function (err) {
            return console.error(err);
        });
    },

    //Метод посылает запрос на добавление в друзья друг другу для currentUser и possibleFriend
    //В res приходит объект currentUser (текущий пользователь)
    addToFriends: function addToFriends(currentUser, possibleFriend) {
        var _this2 = this;

        _api2.default.addToFriends(currentUser, possibleFriend).then(function (res) {
            var currentUser = _UserStore2.default.getCurrentUser();
            if (currentUser._id === res.data._id) {
                console.log('-----UserActions.addToFriends-----');
                console.log(res.data);
                _this2._setFriends(res.data.friends);
                _this2._setPossibleFriends(res.data.possibleFriends);
                _UserStore2.default.setUser(res.data);
                socket.emit('update', { currentUserId: currentUser._id, possibleFriendId: possibleFriend._id });
            }
        }).catch(function (err) {
            return console.error(err);
        });
    },


    //Метод посылает запрос от currentUser на добавление в возможные друзья possibleFriend
    addToPossibleFriends: function addToPossibleFriends(currentUser, possibleFriend) {
        var _this3 = this;

        _api2.default.addToPossibleFriends(currentUser, possibleFriend).then(function (res) {
            var currentUser = _UserStore2.default.getCurrentUser();
            if (currentUser._id === res.data._id) {
                console.log('-----UserActions.addToPossibleFriends-----');
                console.log(res.data);
                _this3._setFriends(res.data.friends);
                _this3._setPossibleFriends(res.data.possibleFriends);
                _UserStore2.default.setUser(res.data);
                socket.emit('update', { currentUserId: currentUser._id, possibleFriendId: possibleFriend._id });
            }
        }).catch(function (err) {
            return console.error(err);
        });
    },


    //Получаем объект User из базы даных по логину и паролю, после чего сохраняем его в Хранилище
    getUser: function getUser(data) {
        var _this4 = this;

        var login = data.login;
        var password = data.password;
        _api2.default.getUser(login, password).then(function (res) {
            if (res.data) {
                console.log('-----UserActions.getUser-----');
                console.log('-----Объект User пришел результат с сервера-----');
                console.log(res.data);
                _UserStore2.default.setUser(res.data);
                console.log('-----заполняем друзей-----');
                console.log(res.data.friends);
                _this4._setFriends(res.data.friends);
                console.log('-----заполняем возможных друзей-----');
                console.log(res.data.possibleFriends);
                _this4._setPossibleFriends(res.data.possibleFriends);
                socket.emit('auth', res.data._id);
            }
        }).catch(function (err) {
            return console.error(err);
        });
    },

    //Получаем объект User из базы даных по id, после чего сохраняем его в Хранилище
    getUserById: function getUserById(id) {
        var _this5 = this;

        _api2.default.getUserById(id).then(function (res) {
            console.log('-----UserActions.getUserById-----');
            console.log('-----Объект User пришел результат с сервера-----');
            console.log(res.data);
            _UserStore2.default.setUser(res.data);
            console.log('-----заполняем друзей-----');
            console.log(res.data.friends);
            _this5._setFriends(res.data.friends);
            console.log('-----заполняем возможных друзей-----');
            console.log(res.data.possibleFriends);
            _this5._setPossibleFriends(res.data.possibleFriends);
        }).catch(function (err) {
            return console.error(err);
        });
    },


    //Заполняем массив UserStore.possibleFriends объектами Возможных друзей
    _setPossibleFriends: function _setPossibleFriends(arrObjIdsPossibleFriends) {
        _api2.default.getPossibleFriends(arrObjIdsPossibleFriends).then(function (res) {
            _UserStore2.default.setPossibleFriends(res.data);
        }).catch(function (err) {
            return console.error(err);
        });
    },


    //Заполняем массив UserStore.friends объектами Друзей
    _setFriends: function _setFriends(arrObjIdsFriends) {
        _api2.default.getFriends(arrObjIdsFriends).then(function (res) {
            _UserStore2.default.setFriends(res.data);
        }).catch(function (err) {
            return console.error(err);
        });
    },
    setOnlineFriend: function setOnlineFriend(friendOnlineId) {
        var friends = _UserStore2.default.getFriends();
        var newFriend = friends.map(function (friend) {
            if (friend._id === friendOnlineId) {
                friend.online = true;
            }
            return friend;
        });
        _UserStore2.default.setFriends(newFriend);
    },
    setOfflineFriend: function setOfflineFriend(friendOfflineId) {
        var friends = _UserStore2.default.getFriends();
        var newFriend = friends.map(function (friend) {
            if (friend._id === friendOfflineId) {
                friend.online = false;
            }
            return friend;
        });
        _UserStore2.default.setFriends(newFriend);
    },


    _preSearchData: null,

    startFilterSearch: function startFilterSearch() {
        this._preSearchFriends = _UserStore2.default.getFriends();
    },
    filterSearch: function filterSearch(e) {
        var target = e.target;
        var needle = target.value.toLowerCase();

        if (!needle) {
            var friends = _UserStore2.default.getFriends();
            _UserStore2.default.setFriends(friends);
            //UserStore.setFilterFriends([]);
            //UserStore.setFriends(this._preSearchFriends);
            return;
        }

        if (!this._preSearchFriends) {
            return;
        }

        var searchdata = this._preSearchFriends.filter(function (friend) {
            var fullname = friend.firstname + ' ' + friend.lastname;
            //console.log('fullname: ', fullname);
            if (fullname.toLowerCase().indexOf(needle) > -1) {
                return true;
            }
            return false;
        });
        //console.log('searchdata: ', searchdata);
        _UserStore2.default.setFilterFriends(searchdata);
    },
    showOnlineFriends: function showOnlineFriends() {
        this._preSearchFriends = _UserStore2.default.getFriends();
        if (!this._preSearchFriends) {
            return;
        }
        var searchdata = this._preSearchFriends.filter(function (friend) {
            if (friend.online) {
                return true;
            }
            return false;
        });
        _UserStore2.default.setFilterFriends(searchdata);
    },
    showAllFriends: function showAllFriends() {
        var friends = _UserStore2.default.getFriends();
        _UserStore2.default.setFriends(friends);
    },
    searchFriend: function searchFriend(data) {
        var search = data.search;
        _api2.default.searchUser(search).then(function (res) {
            console.log('UserActions.searchFriend: ', res.data);
            _UserStore2.default.setSearchFriends(res.data);
        }).catch(function (err) {
            return console.error(err);
        });
    },
    deleteUser: function deleteUser(userId) {
        var _this6 = this;

        _api2.default.deleteUser(noteId).then(function () {
            return _this6.loadUsers();
        }).catch(function (err) {
            return console.error(err);
        });
    },
    getDialog: function getDialog(currentUserId) {
        _api2.default.getUserById(currentUserId).then(function (res) {
            console.log('-----UserActions.getDialog-----');
            console.log('-----Объект User пришел результат с сервера-----');
            console.log(res.data);
            _UserStore2.default.setUser(res.data);
        }).catch(function (err) {
            return console.error(err);
        });
    },
    sendMessage: function sendMessage(currentUser, activeFriend, objMessage) {
        _api2.default.sendMessage(currentUser, activeFriend, objMessage).then(function (res) {
            console.log('-----UserActions.sendMessage-----');
            console.log('-----Объект User с новым диалогом пришел с сервера-----');
            console.log(res.data);
            _UserStore2.default.setUser(res.data);
            socket.emit('newMessage', { currentUserId: currentUser._id, activeFriendId: activeFriend._id });
        }).catch(function (err) {
            return console.error(err);
        });
    },
    setActiveFriend: function setActiveFriend(activeFriend) {
        var currentUser = _UserStore2.default.getCurrentUser();
        //console.log('currentUser: ',currentUser);
        //console.log('activeFriend: ',activeFriend);
        _api2.default.resetNumNewMessage(currentUser, activeFriend).then(function (res) {
            _UserStore2.default.setUser(res.data);
        });
        _UserStore2.default.setActiveFriend(activeFriend);
    },
    uploadPhoto: function uploadPhoto(data) {
        _api2.default.uploadPhoto(data).then(function (res) {
            if (res.data) {
                _UserStore2.default.setUser(res.data);
                _UserStore2.default.setInfoMessage({ status: 'success', text: 'Файл успешно загружен.' });
            } else {
                _UserStore2.default.setInfoMessage({ status: 'error', text: 'Произошла ошибка при загрузке файла. Убедитесь что он имеет расширение jpeg или png и его размер не превышает 1Mb.' });
            }
        }).catch(function (err) {
            return console.error(err);
        });
    }
};

exports.default = UserActions;