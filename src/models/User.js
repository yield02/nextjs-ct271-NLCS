import mongoose from "mongoose";
const Schema = mongoose.Schema;


const User = new Schema({
    username: {type: String, require: true},
    pwd: {type: String, require: true},
    fullname: {type: String},
    email: {type: String, require: true},
    address: {type: String},
    isAdmin: {type: Boolean, default: false},
    status: {type: Object, default: {status: "allow"}},  /* allow/banned  */ 
    role: {type: String, default: "Khách vãng lai"} /* Khách vãng lai/Thành viên/Thành viên tích cực/ Thành viên cao cấp */
}, {timestamps: true});


module.exports = mongoose.models.User || mongoose.model('User', User);