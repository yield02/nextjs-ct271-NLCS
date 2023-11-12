import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Post = new Schema({
    title: {type: String, require: true},
    body: {type: Object, require: true}, 
    author: { type: Schema.Types.ObjectId, ref: 'User', require: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category', require: true},
    status: {type: Object, default: {
        status: "allow",
        reason: ""
    }}, /* waiting, allow, banned, delete */
    deleteAt: {type: Boolean, default: false}
}, {timestamps: true, minimize: false});


module.exports = mongoose.models.Post || mongoose.model('Post', Post);
