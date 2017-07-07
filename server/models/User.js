import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: { type: String, unique: true },
    firstname: { type: String,  },
    lastname: { type: String,  },
    password: { type: String },
    email: { type: String },
    online: {type: Boolean, default: false},
    friends: [{id: String, numNewMessages: {type: Number, default: 0}, dialog: [{text: String, time: Number, ownerId: String, indexNumber: Number}]}],
    possibleFriends: [{id: String}],
    mainImg: {type: String},
});

mongoose.model('User', UserSchema);