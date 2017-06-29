import {EventEmitter} from 'fbemitter';

let currentUser;
const emitter = new EventEmitter();
let possibleFriends;
let searchFriends;
let friends;
const UserStore = {
    init(){
        //currentUser = currentUser;
        currentUser = {
            login: 'guest',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            '_id': null,
            possibleFriends: [],
            friends: [],
        };

        possibleFriends = [];
        searchFriends = [];
        friends = [];
    },

    getCurrentUser(){
        //let currentUser = this.store.currentUser();            
        return currentUser;
    },

    setUser(newUser){
        currentUser = newUser;
        console.log('-----UserStore.setUser-----');
        console.log('-----данные записаны в хранилище-----');
        console.log(currentUser);
        emitter.emit('change');
    },

    setPossibleFriends(arrPossibleFriends){        
        //possibleFriends = arrPossibleFriends;
        arrPossibleFriends
            ? possibleFriends = arrPossibleFriends
            : possibleFriends = [];
        console.log('-----UserStore.setPossibleFriends-----');
        console.log('-----данные Возможные друзья записаны в хранилище-----');
        console.log(possibleFriends);
        emitter.emit('change');
    },

    getPossibleFriends(){
        return possibleFriends;
    },

    setFriends(arrFriends){        
        //possibleFriends = arrPossibleFriends;
        arrFriends
            ? friends = arrFriends
            : friends = [];
        console.log('-----UserStore.setFriends-----');
        console.log('-----данные Друзья записаны в хранилище-----');
        console.log(friends);
        emitter.emit('change');
    },

    getFriends(){
        return friends;
    },

    setSearchFriends(arrSearchFriends){        
        searchFriends = arrSearchFriends;
        emitter.emit('change');
    },

    getSearchFriends(){
        return searchFriends;
    },

    addListener(eventType, fn){
        emitter.addListener(eventType, fn);
    },
}

export default UserStore