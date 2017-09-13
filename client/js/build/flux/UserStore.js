'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fbemitter = require('fbemitter');

var currentUser = void 0;
var emitter = new _fbemitter.EventEmitter();
var possibleFriends = void 0;
var filterFriends = void 0;
var searchFriends = void 0;
var friends = void 0;
var activeFriend = void 0;
var dialog = void 0;
var infoMessage = void 0;

var UserStore = {
    init: function init() {
        currentUser = {
            login: 'guest',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            '_id': null,
            possibleFriends: [],
            friends: [],
            mainImg: './images/no-avatar.jpg'
        };

        possibleFriends = [];
        searchFriends = [];
        friends = [];
        filterFriends = [], activeFriend = null;
        dialog = [];
        infoMessage = null;
    },
    setFilterFriends: function setFilterFriends(friends) {
        filterFriends = friends;
        emitter.emit('filterFriends');
    },
    getFilterFriends: function getFilterFriends() {
        return filterFriends;
    },
    setActiveFriend: function setActiveFriend(friend) {
        activeFriend = friend;
        var posActiveFriend = currentUser.friends.map(function (item) {
            return item.id;
        }).indexOf(friend._id);
        dialog = currentUser.friends[posActiveFriend].dialog;
        //console.log('UserStore.setActiveFriend: activeFriend', activeFriend);
        //console.log('UserStore.setActiveFriend: dialog', dialog);
        emitter.emit('changeActiveFriend');
    },
    getDialog: function getDialog() {
        if (activeFriend) {
            var posActiveFriend = currentUser.friends.map(function (item) {
                return item.id;
            }).indexOf(activeFriend._id);
            dialog = currentUser.friends[posActiveFriend].dialog;
            return dialog;
        }
        return dialog;
    },
    getActiveFriend: function getActiveFriend() {
        return activeFriend;
    },
    getCurrentUser: function getCurrentUser() {
        return currentUser;
    },
    setUser: function setUser(newUser) {
        currentUser = newUser;
        console.log('-----UserStore.setUser-----');
        console.log('-----данные записаны в хранилище-----');
        console.log(currentUser);
        emitter.emit('change');
    },
    setPossibleFriends: function setPossibleFriends(arrPossibleFriends) {
        arrPossibleFriends ? possibleFriends = arrPossibleFriends : possibleFriends = [];
        console.log('-----UserStore.setPossibleFriends-----');
        console.log('-----данные Возможные друзья записаны в хранилище-----');
        console.log(possibleFriends);
        emitter.emit('change');
    },
    getPossibleFriends: function getPossibleFriends() {
        return possibleFriends;
    },
    setFriends: function setFriends(arrFriends) {
        arrFriends ? friends = arrFriends : friends = [];
        console.log('-----UserStore.setFriends-----');
        console.log('-----данные Друзья записаны в хранилище-----');
        console.log(friends);
        emitter.emit('change');
    },
    getFriends: function getFriends() {
        return friends;
    },
    setSearchFriends: function setSearchFriends(arrSearchFriends) {
        var currentUserId = currentUser._id;
        var friendIdx = friends.map(function (friend) {
            return friend._id;
        });
        searchFriends = arrSearchFriends.filter(function (searchFriend) {
            return searchFriend._id !== currentUserId;
        });
        searchFriends = searchFriends.map(function (searchFriend) {
            if (friendIdx.indexOf(searchFriend._id) < 0) {
                searchFriend.inFriends = false;
                return searchFriend;
            } else {
                searchFriend.inFriends = true;
                return searchFriend;
            }
        });
        emitter.emit('change');
        searchFriends = [];
    },
    getSearchFriends: function getSearchFriends() {
        return searchFriends;
    },
    addListener: function addListener(eventType, fn) {
        emitter.addListener(eventType, fn);
    },
    getMainImg: function getMainImg() {
        if (currentUser.mainImg) {
            return currentUser.mainImg;
        } else {
            return './images/no-avatar.jpg';
        }
    },
    setInfoMessage: function setInfoMessage(msg) {
        infoMessage = msg;
        console.log('-----UserStore.setInfoMessage-----');
        console.log(msg);
        emitter.emit('newInfoMessage');
        infoMessage = null;
    },
    getInfoMessage: function getInfoMessage() {
        return infoMessage;
    }
};

exports.default = UserStore;