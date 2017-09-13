import {EventEmitter} from 'fbemitter';

let currentUser;
const emitter = new EventEmitter();
let possibleFriends;
let filterFriends;
let searchFriends;
let friends;
let activeFriend;
let dialog;
let infoMessage;

const UserStore = {
    init(){
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
        //console.log('UserStore.setActiveFriend: activeFriend', activeFriend);
        //console.log('UserStore.setActiveFriend: dialog', dialog);
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
        let currentUserId = currentUser._id;
        let friendIdx = friends.map(friend => friend._id);
        searchFriends = arrSearchFriends.filter( searchFriend => {
            return ( searchFriend._id !== currentUserId );
        });
        searchFriends = searchFriends.map( searchFriend => {
            if ( friendIdx.indexOf(searchFriend._id) < 0){
                searchFriend.inFriends = false;
                return searchFriend;
            }else{
                searchFriend.inFriends = true;
            return searchFriend;
            }
            
        });
        emitter.emit('change');
        searchFriends = [];
    },

    getSearchFriends(){
        return searchFriends;
    },

    addListener(eventType, fn){
        emitter.addListener(eventType, fn);
    },

    getMainImg(){
        if (currentUser.mainImg){
            return currentUser.mainImg;
        }else{
            return './images/no-avatar.jpg';
        }
    },

    setInfoMessage(msg){
        infoMessage = msg;
        console.log('-----UserStore.setInfoMessage-----');
        console.log(msg);
        emitter.emit('newInfoMessage');
        infoMessage = null;
    },

    getInfoMessage(){
        return infoMessage;
    }
}

export default UserStore