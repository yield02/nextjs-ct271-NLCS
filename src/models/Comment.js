import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Comment = new Schema({
    user_id: {type: String},
    body: {type: String, require: true},
}, {timestamps: true});

export default Comment;