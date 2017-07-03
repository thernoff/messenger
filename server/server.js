'use strict'

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db from './utils/DataBaseUtils.js';
import { serverPort } from '../etc/config.json';
import socket from 'socket.io';
import expressHandlebars from 'express-handlebars';
import credentials from './credentials.js';
import cookieParser from 'cookie-parser';
db.setUpConnection();

const app = express();

const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    //extname: '.hbs',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            //console.log(options.fn(this));
            return null;
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use( bodyParser.json() );

app.use((cookieParser)(credentials.cookieSecret));

// Allow requests from any origin
app.use(cors({ origin: '*' }));

app.get('/', function (req, res) {
    //res.sendfile(__dirname + '/index.html');
    res.render('messenger');
});

app.get('/users', (req, res) => {
    //db.listUsers().then(data => res.send(data));
    //console.log('data');
    res.send('data');
});

app.post('/user/get', (req, res) => {
    db.getUser(req.body)
        .then(
            (data) => {
                //res.cookie('userId', data._id, {httpOnly: true, signed: true});
                //let user = db.getFullUser(data);
                //console.log(user);
                res.send(data);
            }
        )
        .catch( 
            ()=> res.send(null) 
        );
});

app.post('/possible/get', (req, res) => {
    db.getPossibleFriends(req.body)
        .then(
            (data) => {
                //console.log(data);
                res.send(data);
            }
        );
});

app.post('/possible/add', (req, res) => {
    console.log('/possible/add');
    db.addToPossibleFriends(req.body)
        .then(
            (data) => {
                console.log('data: ', data);
                res.send(data);
            }
        );
});

app.post('/friends/get', (req, res) => {
    db.getFriends(req.body)
        .then(
            (data) => {
                let arrFriends = data.map((friend) => {
                    if ( objClients[friend._id]){                        
                        friend.online = true;
                    }
                    return friend;
                });
                //console.log(arrFriends);
                res.send(arrFriends);
            }
        );
});

app.post('/friend/add', (req, res) => {
    db.addToFriends(req.body)
        .then( data => {
            res.send(data);
            })
        .catch( ()=> res.send(null) );
});

app.post('/user/create', (req, res) => {
    console.log(req.body);
    db.createUser(req.body)
        .then( data => res.send(data) )
        .catch( ()=> res.send(null) );
});

app.get('/user/get/:id', (req, res) => {
    db.getUserById(req.params.id)
        .then( data => res.send(data) )
        .catch( ()=> res.send(null) );
});

app.get('/user/search/:search', (req, res) => {
    db.searchUser(req.params.search)
        .then( data => res.send(data) )
        .catch( ()=> res.send(null) );
});

app.post('/user/update', (req, res) => {
    //console.log(req.body);
    db.updateUser(req.body)
        .then( data => res.send(data) )
        .catch( ()=> res.send(null) );
    
});

app.delete('/user/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

app.post('/message/send', (req, res) => {
    db.sendMessage(req.body)
        .then(
            (data) => {
                //console.log(data);
                res.send(data);
            }
        );
});

const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});

const io = socket.listen(server);
//Хранилище для подкдюченных пользователей
let objClients = {};

io.sockets.on('connection', function(client){
    //console.log('Connected:');
    //console.log(client.id);
    client.on('auth', function(currentUserId){
        if (!objClients[currentUserId]){
            //objClients[client.id] = userId;
            objClients[currentUserId] = client.id;
        }
        console.log('objClients: ', objClients);
        io.sockets.emit('online', currentUserId);
    });
    client.on('update', function(data){
        if (objClients[data.possibleFriendId]){
            let clientId = objClients[data.possibleFriendId];
            io.sockets.sockets[clientId].emit('newPossibleFriend', data.possibleFriendId);
        }
        
    });

    client.on('newMessage', function(data){
        if (objClients[data.activeFriendId]){
            let clientId = objClients[data.activeFriendId];
            io.sockets.sockets[clientId].emit('newMessage', data.activeFriendId);
        }
        
    });

    client.on('disconnect', function () {
        let currentUserId;
        for (let key in objClients) {
            if (objClients[key] === client.id){
                currentUserId = key;
                delete objClients[key];
            }
        }        
        console.log('objClients: ', objClients);
        io.sockets.emit('offline', currentUserId);
        //io.sockets.emit('hello', {hello: 'Одно подключение потеряно.'});
        console.log('Client ' + client.id + ' disconnected');
    });
});