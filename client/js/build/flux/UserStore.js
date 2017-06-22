'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fbemitter = require('fbemitter');

var currentUser = void 0;
var emitter = new _fbemitter.EventEmitter();
var newFriends = void 0;

var UserStore = {
    init: function init() {
        //currentUser = currentUser;
        currentUser = {
            login: 'guest',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            '_id': null
        };

        newFriends = [{}];
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
    setPossibleFriends: function setPossibleFriends(arrNewFriends) {
        newFriends = arrNewFriends;
        emitter.emit('change');
    },
    getPossibleFriends: function getPossibleFriends() {
        return newFriends;
    },
    addListener: function addListener(eventType, fn) {
        emitter.addListener(eventType, fn);
    }
};

exports.default = UserStore;