import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Post = new Schema({
    title: {type: String, require},
    body: {type: Object, require}, 
    author: { type: Schema.Types.ObjectId, ref: 'User', require},
    category: {type: Schema.Types.ObjectId, ref: 'Category', require},
    status: {type: String, default: "allow"}, /* waiting, allow, warning, delete */
    deleteAt: {type: Boolean, default: false}
}, {timestamps: true, minimize: false});


module.exports = mongoose.models.Post || mongoose.model('Post', Post);
