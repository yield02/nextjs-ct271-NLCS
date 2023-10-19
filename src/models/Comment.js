import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Comment = new Schema({
    body: {type: String, require: true},
    post_id: {type: Schema.Types.ObjectId, ref: 'Post', require},
    user_id: {type: Schema.Types.ObjectId, ref: 'User', require},
}, {timestamps: true});

export default Comment;