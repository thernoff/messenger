'use strict'

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db from './utils/DataBaseUtils.js';
import { serverPort } from '../etc/config.json';
import { imageSettings } from '../etc/config.json';
import { cloudinarySettings } from '../etc/config.json';
import socket from 'socket.io';
import expressHandlebars from 'express-handlebars';
import credentials from './credentials.js';
import cookieParser from 'cookie-parser';
import formidable from 'formidable';
import fs from 'fs';
import jimp from 'jimp';
import cloudinary from 'cloudinary';
import passwordHash from 'password-hash';

db.setUpConnection();

cloudinary.config( cloudinarySettings );

const app = express();

const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
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
app.set('views', __dirname + '/views');

app.use('/upload', express.static(__dirname + '/upload'));
app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );
app.use((cookieParser)(credentials.cookieSecret));

// Разрешать запросы от любого источника
app.use(cors({ origin: '*' }));

app.get('/', function (req, res) {
    console.log('process.env.PORT', process.env.PORT);
    res.render('messenger');
});

app.post('/user/create', (req, res) => {
    //console.log(req.body);
    db.createUser(req.body)
        .then( data => res.send(data) )
        .catch( () => res.send(null) );
});

app.post('/user/get', (req, res) => {
    //console.log(req.body);
    let password = req.body.password;
    db.getUser(req.body)
        .then(
            (data) => {
                if (data.checkPassword(password)){
                    res.send(data);
                } else {
                    res.send(null);
                }
            }
        )
        .catch( 
            () => res.send(null) 
        );
});

app.get('/user/get/:id', (req, res) => {
    db.getUserById(req.params.id)
        .then( data => res.send(data) )
        .catch( () => res.send(null) );
});

app.get('/user/search/:search', (req, res) => {
    if (req.params.search){
        db.searchUser(req.params.search)
            .then( data => res.send(data) )
            .catch( () => res.send(null) );
    }else{
        res.send(null);
    }
});

app.get('/user/search/', (req, res) => {
    res.send(null);
});

app.post('/user/update', (req, res) => {
    //console.log(req.body);
    db.updateUser(req.body)
        .then( data =>  res.send(data) )
        .catch( () => res.send(null) );
});

/*app.delete('/user/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});*/

app.post('/possible/get', (req, res) => {
    db.getPossibleFriends(req.body)
        .then(
            (data) => {
                //console.log(data);
                res.send(data);
            }
        )
        .catch( () => res.send(null) );
});

app.post('/possible/add', (req, res) => {
    db.addToPossibleFriends(req.body)
        .then(
            (data) => {
                //console.log('data: ', data);
                res.send(data);
            }
        )
        .catch( () => res.send(null) );
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
        )
        .catch( () => res.send(null) );
});

app.post('/friend/add', (req, res) => {
    db.addToFriends(req.body)
        .then( data => res.send(data) )
        .catch( () => res.send(null) );
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

app.post('/message/reset', (req, res) => {
    db.resetNumNewMessage(req.body)
        .then(
            (data) => {
                //console.log(data);
                res.send(data);
            }
        );
});

app.put('/upload/server/', (req, res) => {

    let dataDir = __dirname + '/upload';
    //console.log('dataDir: ', dataDir);
    let avatarPhotoDir = dataDir + '/avatars';
    //console.log('avatarPhotoDir: ', avatarPhotoDir);
    if( !fs.existsSync(dataDir) ){
        fs.mkdirSync(dataDir);
    }
    if( !fs.existsSync(avatarPhotoDir) ){
        fs.mkdirSync(avatarPhotoDir);
    }

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err){
            res.send(null);
        }
        let photo = files.photo;
        let currentUserId = fields.currentUserId;
        let dir = avatarPhotoDir + '/' + currentUserId;
        console.log('dir: ', dir);
        //console.log('photo: ', photo);

        if (photo && ( imageSettings.types.indexOf(photo.type) > -1 ) && ( photo.size < imageSettings.maxSize )){
            
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }

            let src = dir + '/' + photo.name;
            //console.log('src: ', src);
            cloudinary.uploader.upload(src, {timestamp: new Date().getTime()},
                function(error, result) {console.log(result); 
            });
            //console.log('photo.path: ', photo.path);
            jimp.read(photo.path)
                .then(function (image) {
                    let originalWidth = image.bitmap.width;
                    let originalHeight = image.bitmap.height;
                    let min = Math.min(originalWidth, originalHeight);
                    let x = Math.round((originalWidth - min)/2);
                    let y = Math.round((originalHeight - min)/2);
                    image.crop(x, y, min, min)
                        .resize(200, jimp.AUTO)      // resize
                        .quality(70)                 // set JPEG quality
                        .write(src);                 // save
                    if (process.env.PORT){
                        cloudinary.v2.uploader.upload(src, {folder: currentUserId, timestamp: new Date().getTime()}, function(error, result) {
                            //console.log( result );
                            db.updateUser({_id: currentUserId, mainImg: cloudinary.url( result.public_id )})
                            .then(
                                (data) => {
                                    //console.log(data);
                                    res.send(data);
                                })
                            .catch( ()=> res.send(null) );
                        });
                    }else{
                        let url = "./upload/avatars/" + currentUserId + "/" + photo.name;
                        db.updateUser({_id: currentUserId, mainImg: url})
                            .then(
                                (data) => {
                                    //console.log(data);
                                    res.send(data);
                                }
                            ).catch( ()=> res.send(null) );
                    }
                    })
                .catch(function (err) {
                    console.error(err);
                    res.send(null);
                });
        }else{
            res.send(null);    
        }
        //res.send(null);
    });
});

app.set('port', (process.env.PORT || serverPort));

const server = app.listen(app.get('port'), () => {
    console.log(`Server is up and running on port ${app.get('port')}`);
});

const io = socket.listen(server);
//Хранилище для подкдюченных пользователей
let objClients = {};

io.sockets.on('connection', function(client){
    //console.log('Connected:');
    //console.log(client.id);
    client.on('auth', function(currentUserId){
        if (!objClients[currentUserId]){
            objClients[currentUserId] = client.id;
        }
        //console.log('objClients: ', objClients);
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
        //console.log('objClients: ', objClients);
        io.sockets.emit('offline', currentUserId);
        console.log('Client ' + client.id + ' disconnected');
    });
});