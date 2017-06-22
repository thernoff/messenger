import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: { type: String, unique: true },
    firstname: { type: String,  },
    lastname: { type: String,  },
    password: { type: String },
    email: { type: String },
    friends: [String],
    possibleFriends: [{id: String}],
});

mongoose.model('User', UserSchema);