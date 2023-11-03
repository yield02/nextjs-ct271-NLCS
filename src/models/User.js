import mongoose from "mongoose";
const Schema = mongoose.Schema;


const User = new Schema({
    username: {type: String, require: true},
    pwd: {type: String, require: true},
    fullname: {type: String},
    email: {type: String, require: true},
    address: {type: String},
    isAdmin: {type: Boolean, default: false},
    role: {type: String, default: "Thành Viên Mới"}
}, {timestamps: true});


module.exports = mongoose.models.User || mongoose.model('User', User);