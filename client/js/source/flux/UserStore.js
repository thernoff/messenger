import {EventEmitter} from 'fbemitter';

let currentUser;
const emitter = new EventEmitter();
let possibleFriends;
let filterFriends;
let searchFriends;
let friends;
let activeFriend;
let dialog;
let mainImg;
let infoMessage;
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
            mainImg: ''
        };

        possibleFriends = [];
        searchFriends = [];
        friends = [];
        filterFriends = [],
        activeFriend=null;
        dialog = [];
        infoMessage = null;
    },

    setFilterFriends(friends){
        filterFriends = friends;
        emitter.emit('filterFriends');
    },

    getFilterFriends(){
        return filterFriends;
    },

    setActiveFriend(friend){
        activeFriend = friend;
        let posActiveFriend = currentUser.friends.map((item) => {return item.id}).indexOf(friend._id);
        dialog = currentUser.friends[posActiveFriend].dialog;
        console.log('UserStore.setActiveFriend: activeFriend', activeFriend);
        console.log('UserStore.setActiveFriend: dialog', dialog);
        emitter.emit('changeActiveFriend');
    },

    getDialog(){
        if (activeFriend){
            let posActiveFriend = currentUser.friends.map((item) => {return item.id}).indexOf(activeFriend._id);
            dialog = currentUser.friends[posActiveFriend].dialog;
            return dialog;
        }
        return dialog;
    },

    getActiveFriend(){ 
        return activeFriend;
    },

    getCurrentUser(){          
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

    getMainImg(){
        if (currentUser.mainImg){
            return currentUser._id + '/' + currentUser.mainImg;
        }
        return 'no-avatar.jpg';
    },

    setInfoMessage(msg){
        infoMessage = msg;
        console.log('-----UserStore.setInfoMessage-----');
        console.log(msg);
        //emitter.emit('change');
        emitter.emit('newInfoMessage');
        //setTimeout( function(){infoMessage = ''}.bind(this), 1000);
        infoMessage = null;
    },

    getInfoMessage(){
        return infoMessage;
    }
}

export default UserStore