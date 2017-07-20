import axios from 'axios';

//import { apiPrefix } from '../../../../etc/config.json';
let apiPrefix = (location.hostname === 'localhost') ? 'http://localhost:8080' : location.href;

if (apiPrefix.lastIndexOf('/') === (apiPrefix.length - 1))
{
    apiPrefix = apiPrefix.substr(0, apiPrefix.length - 1);
}
console.log('apiPrefix', apiPrefix);
export default {
    
    createUser(data) {
        return axios.post(`${apiPrefix}/user/create/`, data);
    },

    listUsers() {
        return axios.get(`${apiPrefix}/users`);
    },

    getUser(login, password){
        return axios.post(`${apiPrefix}/user/get/`, {login: login, password: password});
    },

    getPossibleFriends(arrObjIdsPossibleFriends){
        return axios.post(`${apiPrefix}/possible/get/`, arrObjIdsPossibleFriends);
    },

    getFriends(arrObjIdsFriends){
        return axios.post(`${apiPrefix}/friends/get/`, arrObjIdsFriends);
    },

    getUserById(id){
        return axios.get(`${apiPrefix}/user/get/${id}`);
    },

    updateUser(data) {
        return axios.post(`${apiPrefix}/user/update/`, data);
    },

    addToFriends(currentUser, possibleFriend) {
        return axios.post(`${apiPrefix}/friend/add/`, {currentUser: currentUser, possibleFriend: possibleFriend});
    },

    addToPossibleFriends(currentUser, possibleFriend) {
        return axios.post(`${apiPrefix}/possible/add/`, {currentUser: currentUser, possibleFriend: possibleFriend});
    },

    searchUser(search){
        return axios.get(`${apiPrefix}/user/search/${search}`);
    },

    deleteUser(userId) {
        return axios.delete(`${apiPrefix}/user/${userId}`);
    },

    sendMessage(currentUser, activeFriend, objMessage){
        return axios.post(`${apiPrefix}/message/send/`, {currentUser: currentUser, activeFriend: activeFriend, objMessage: objMessage});
    },

    resetNumNewMessage(currentUser, activeFriend){
        return axios.post(`${apiPrefix}/message/reset/`, {currentUserId: currentUser._id, activeFriendId: activeFriend._id});
    },

    uploadPhoto(data){
        return axios.put(`${apiPrefix}/upload/server/`, data);
    }
}
