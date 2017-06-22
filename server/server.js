'use strict'

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db from './utils/DataBaseUtils.js';
import { serverPort } from '../etc/config.json';

db.setUpConnection();

const app = express();

app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

app.get('/users', (req, res) => {
    //db.listUsers().then(data => res.send(data));
    console.log('data');
    res.send('data');
});

app.post('/user/get', (req, res) => {
    db.getUser(req.body).then(data => res.send(data));
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

const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});