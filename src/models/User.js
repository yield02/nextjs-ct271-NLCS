import mongoose from "mongoose";
const Schema = mongoose.Schema;


const User = new Schema({
    username: {type: String, require: true},
    pwd: {type: String, require: true},
    fistname: {type: String},
    lastname: {type: String},
    email: {type: String, require: true},
    role: {type: String}
}, {timestamps: true});


module.exports = mongoose.models.User || mongoose.model('User', User);