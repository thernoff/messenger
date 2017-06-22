import axios from 'axios';

import { apiPrefix } from '../../../../etc/config.json';

export default {

    test() {
        return axios.get('http://localhost:8080/users');
    },

    listUsers() {
        return axios.get(`${apiPrefix}/users`);
    },

    getUser(login, password){
        //console.log(login);
        //console.log(password);
        return axios.post(`${apiPrefix}/user/get/`, {login: login, password: password});
    },

    getUserById(id){
        return axios.get(`${apiPrefix}/user/get/${id}`);
    },

    createUser(data) {
        return axios.post(`${apiPrefix}/user/create/`, data);
    },

    updateUser(data) {
        return axios.post(`${apiPrefix}/user/update/`, data);
    },

    searchUser(search){
        return axios.get(`${apiPrefix}/user/search/${search}`);
    },

    deleteNote(noteId) {
        return axios.delete(`${apiPrefix}/user/${noteId}`);
    }
}
