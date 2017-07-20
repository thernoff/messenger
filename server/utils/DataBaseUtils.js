import mongoose from "mongoose";
import htmlspecialchars from "htmlspecialchars";
import passwordHash from 'password-hash';
import config from '../../etc/config.json';
import '../models/User';

const User = mongoose.model('User');

export function setUpConnection() {
    if (process.env.PORT){
        mongoose.connect(config.remoteDataBase.uri);
    }else{
        mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    }
}

export function createUser(data) {
    //console.log('DataBaseUtils.createUser: data = ', data);
    let login = htmlspecialchars(data.login);
    let password = htmlspecialchars(data.password);
    const user = new User({
        login: login,
        password: password//passwordHash.generate(password)
        //email: htmlspecialchars(data.email),
    });

    return user.save(function(error) {
      console.log(error);
    });
}

export function getUser(data) {
    
    let login = htmlspecialchars(data.login);
    let password = htmlspecialchars(data.password);
    //console.log('password: ', password);
    //console.log('passwordHash.generate(password): ', passwordHash.generate(password));
    let query = User.findOne({login: login});
    //console.log('query: ', query);
    let user = query.exec(function(err, user){
        if(err){
            console.log("Failed to get User object.");
        }
        //console.log(user);
    });
    //console.log('user: ', user);
    return user;
}

export function getUserById(id) {
    return User.findById(id);
}

export function getPossibleFriends(arrObjIdsPossibleFriends){
    let arrIds = arrObjIdsPossibleFriends.map((item)=>{return item.id;});
    //console.log(arrIds);
    let query = User.find().select('-password -possibleFriends -friends').where('_id').in(arrIds);
    return query.exec(function(err){
        if(err){
            console.log("Failed to get array of possible friends.");
        }
    });
}

export function getFriends(arrObjIdsFriends){
    let arrIds = arrObjIdsFriends.map((item)=>{return item.id;});
    //console.log(arrIds);
    let query = User.find().select('-password -possibleFriends -friends').where('_id').in(arrIds);
    return query.exec(function(err){
        if(err){
            console.log("Failed to get array of friends.");
        }
    });
}

export function searchUser(searchUser) {
    let arr = [];
    let user = [{}];
    let query;
    let search = searchUser.trim();
    if (search.indexOf(' ') > -1){
        arr = search.split(/[ ]+/);
        if (arr.length === 2){
            query = User.find();
            query.or([{firstname: arr[0], lastname: arr[1]}, {firstname: arr[1], lastname: arr[0]}]);
            user = query.exec();
        }
    } else {
        query = User.find({login: search});
        user = query.exec();
        //return user;
    }
    //console.log(user);
    //return user.password === password ? user : null;
    return user;
}

export function updateUser(data) {
    //console.log('data: ', data);
    /*
        { login: 'user',
        password: 'hash',
        firstname: 'A',
        lastname: 'B',
        email: 'user@gmail.com',
        _id: '596db1b0cf18fb1cfcc9aec0' }
    */
    if (!data.password){
        delete data.password;
    }else{
        data.password = passwordHash.generate(data.password);
    }
    let currentUserId = data._id;
    delete data._id;
    console.log('currentUserId: ', currentUserId);
    let query = User.findByIdAndUpdate(currentUserId, data, {new: true});
    return query.exec(function(err, user){
        if(err){
            console.log("An error occurred while updating the data.");
            console.log(err);
        }
    });
}

export function addToPossibleFriends(data) {
    let currentUserId = data.currentUser._id;
    let possibleFriendId = data.possibleFriend._id;

    User.findById(possibleFriendId, function(err, possibleFriend){
        //Проверка: существует ли currentUser (текущий пользователь) среди друзей (possibleFriend.friends) и возможных друзей (possibleFriend.possibleFriends) у possibleFriend (предполагаемый друг)
        let pos = possibleFriend.friends.map((item) => { return item.id }).indexOf(currentUserId);
        let positionCurrentUser = possibleFriend.possibleFriends.map(function(friend) { return friend.id; }).indexOf(currentUserId);
        if (pos < 0 && positionCurrentUser < 0){
            possibleFriend.possibleFriends.push({id: currentUserId});
        }
        possibleFriend.save();
    });

    return User.findById(currentUserId, function(error, currentUser){
        if (error){
            console.log(error);
        }
    });
}

export function addToFriends(data) {
    let currentUserId = data.currentUser._id;
    let possibleFriendId = data.possibleFriend._id;

    User.findById(possibleFriendId, function(err, possibleFriend){
        //Проверка: существует ли currentUser (текущий пользователь) среди друзей у possibleFriend (предполагаемый друг)
        //Находим позицию currentUser (текущего пользователя) в массиве друзей у possibleFriend (предполагаемого друга)
        //Позиция (pos) должна быть равна -1 (pos = -1)
        let pos = possibleFriend.friends.map((item) => { return item.id }).indexOf(currentUserId);
        if (pos < 0){
            let positionCurrentUser = possibleFriend.possibleFriends.map(function(friend) { return friend.id; }).indexOf(currentUserId);
            if (positionCurrentUser > -1){
                possibleFriend.possibleFriends.splice(positionCurrentUser, 1);                
            }
            possibleFriend.friends.push({id: currentUserId});            
        }
        possibleFriend.save();
    });

    let query = User.findById(currentUserId);

    return query.exec(function(err, currentUser){
        //Проверка: существует ли possibleFriend (предполагаемый друг) среди друзей currentUser (текущий пользователь)
        //Находим позицию possibleFriend (предполагаемый друг) в массиве друзей у currentUser (текущего пользователя)
        //Позиция (pos) должна быть равна -1 (pos = -1)
        let pos = currentUser.friends.map((item) => { return item.id }).indexOf(possibleFriendId);
        if (pos < 0){
            let positionPossibleFriend = currentUser.possibleFriends.map(function(friend) { return friend.id; }).indexOf(possibleFriendId);
            if (positionPossibleFriend > -1){
                currentUser.possibleFriends.splice(positionPossibleFriend, 1);                
            }
            currentUser.friends.push({id: possibleFriendId});
        }
        currentUser.save(function(error) {
            if (error){
                console.log(error);
            }            
        });
    });
}

export function sendMessage(data) {
    let currentUserId = data.currentUser._id;
    let activeFriendId = data.activeFriend._id;

    let message = {};
    message.text = data.objMessage.message;
    message.time = new Date().getTime();

    User.findById(activeFriendId, function(err, activeFriend){
        message.ownerId = currentUserId;
        message.indexNumber = 1;
        let pos = activeFriend.friends.map((item) => { return item.id }).indexOf(currentUserId);

        activeFriend.friends[pos].dialog.push(message);
        activeFriend.friends[pos].numNewMessages++;
        //console.log(activeFriend.friends[pos].dialog);
        activeFriend.save(function(error) {
            if (error){
                console.log(error);
            }            
        });
    });

    let query = User.findById(currentUserId);

    return query.exec(function(err, currentUser){
        message.ownerId = currentUserId;
        message.indexNumber = 1;
        console.log(currentUser.friends);
        let pos = currentUser.friends.map((item) => {return item.id}).indexOf(activeFriendId);
        console.log(pos);
        if (!currentUser.friends[pos].dialog){
            currentUser.friends[activeFriendId].dialog = [];
        }
        
        currentUser.friends[pos].dialog.push(message);;
        console.log(currentUser.friends[pos].dialog);
        currentUser.save(function(error) {
            if (error){
                console.log(error);
            }            
        });
    });
}

export function resetNumNewMessage(data) {
    let currentUserId = data.currentUserId;
    let activeFriendId = data.activeFriendId;
    let query = User.findById(currentUserId);
    return query.exec(function(err, currentUser){
        let pos = currentUser.friends.map((item) => {return item.id}).indexOf(activeFriendId);
        currentUser.friends[pos].numNewMessages = 0;
        currentUser.save(function(error) {
            if (error){
                console.log(error);
            }            
        });
    });
}

export function deleteUser(id) {
    return User.findById(id).remove();
}