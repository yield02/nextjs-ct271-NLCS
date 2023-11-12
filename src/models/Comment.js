import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Comment = new Schema({
    body: {type: Object, require: true}, 
    post_id: {type: Schema.Types.ObjectId, ref: 'Post', require: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'User', require: true},
}, {timestamps: true, minimize: false});

module.exports = mongoose.models.Comment || mongoose.model('Comment', Comment);