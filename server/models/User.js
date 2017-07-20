import mongoose from "mongoose";
import passwordHash from 'password-hash';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: { type: String, unique: true },
    firstname: { type: String, },
    lastname: { type: String, },
    /*password: { 
        type: String,         
        set: function(value) {
            console.log('User.value', value);
            //console.log('User.this.hash', this.hash);
            return passwordHash.generate(value);
        },
        get: function(value) {
            return value;
        }
    },*/
    password: { type: String},
    //hash: { type: String },
    email: { type: String },
    online: {type: Boolean, default: false},
    friends: [{id: String, numNewMessages: {type: Number, default: 0}, dialog: [{text: String, time: Number, ownerId: String, indexNumber: Number}]}],
    possibleFriends: [{id: String}],
    mainImg: {type: String},
});

//когда обращаемся к свойству password (которое является виртуальным)
/*UserSchema.virtual('password')
    .set(function(data){
        console.log('SET');
        this.hash = passwordHash.generate(data);
    })
    .get(function(){
        return this.hash;
    });
*/

UserSchema.methods.checkPassword = function(data){
    return passwordHash.verify(data, this.password);
};

mongoose.model('User', UserSchema);