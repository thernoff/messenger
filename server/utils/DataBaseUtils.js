import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/User';

const User = mongoose.model('User');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listUsers(id) {
    return User.find();
}

export function getUser(data) {
    let login = data.login;
    let password = data.password;
    let user = User.findOne({login: login, password: password});
    //console.log(user);
    //return user.password === password ? user : null;
    return user;
}

export function searchUser(search) {
    let arr = [];
    let user = [{}];
    let query;
    if (search.indexOf(' ') > -1){
        arr = search.split(/[ ]+/);
        query = User.find();
        query.or([{firstname: arr[0], lastname: arr[1]}, {firstname: arr[1], lastname: arr[0]}]);
        user = query.exec();
        //console.log(user);
        //user.concat(User.find({firstname: arr[1], lastname: arr[0]}));
    } else {
        query = User.find({login: search});
        user = query.exec();
        //return user;
    }
    //console.log(user);
    //return user.password === password ? user : null;
    return user;
}

export function getUserById(id) {
    console.log('2');
    return User.findById(id);
}

export function createUser(data) {
    console.log(data);
    const user = new User({
        login: data.login,
        password: data.password,
        email: data.email,
    });

    return user.save(function(error) {
      console.log(error);
    });
}

export function updateUser(data) {
    //console.log(currentUser);
    let query = User.findById(data._id);
    return query.exec(function(error, user){
        console.log('-----DATA-----');
        console.log(data);
        console.log('-----USER-----');
        console.log(user);
        for (let key in data){
            if (data[key] && key !== '_id'){
                user[key] = data[key];
            }
        }
        user.save(function(error) {
            if (error){
                console.log(error);
            }            
        });
    });
}

export function deleteUser(id) {
    return User.findById(id).remove();
}