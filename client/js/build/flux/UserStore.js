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
var UserStore = {
    init: function init() {
        //currentUser = currentUser;
        currentUser = {
            login: 'guest',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            '_id': null,
            possibleFriends: [],
            friends: []
        };

        possibleFriends = [];
        searchFriends = [];
        friends = [];
        filterFriends = [], activeFriend = null;
        dialog = [];
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
        console.log('UserStore.setActiveFriend: ', dialog);
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
        //possibleFriends = arrPossibleFriends;
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
        //possibleFriends = arrPossibleFriends;
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
        searchFriends = arrSearchFriends;
        emitter.emit('change');
    },
    getSearchFriends: function getSearchFriends() {
        return searchFriends;
    },
    addListener: function addListener(eventType, fn) {
        emitter.addListener(eventType, fn);
    }
};

exports.default = UserStore;