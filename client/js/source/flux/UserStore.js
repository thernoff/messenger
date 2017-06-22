import {EventEmitter} from 'fbemitter';

let currentUser;
const emitter = new EventEmitter();
let newFriends;

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
        };

        newFriends = [{}];
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

    setPossibleFriends(arrNewFriends){
        newFriends = arrNewFriends;
        emitter.emit('change');
    },

    getPossibleFriends(){
        return newFriends;
    },

    addListener(eventType, fn){
        emitter.addListener(eventType, fn);
    },
}

export default UserStore