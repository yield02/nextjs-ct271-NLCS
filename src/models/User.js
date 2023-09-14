import mongoose from "mongoose";
const Schema = mongoose.Schema;


const User = new Schema({
    username: {type: String, require: true},
    pwd: {type: String, require: true},
    fistname: {type: String, require: true},
    lastname: {type: String, require: true},
    email: {type: String, require: true},
    role: {type: String}
})



module.exports = mongoose.model('User', User);