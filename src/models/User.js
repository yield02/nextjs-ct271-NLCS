import mongoose from "mongoose";
const Schema = mongoose.Schema;


const User = new Schema({
    username: {type: String, require: true},
    pwd: {type: String, require: true},
    fullname: {type: String},
    email: {type: String, require: true},
    address: {type: String},
    role: {type: String}
}, {timestamps: true});


module.exports = mongoose.models.User || mongoose.model('User', User);