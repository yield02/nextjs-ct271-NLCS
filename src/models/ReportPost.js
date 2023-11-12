import mongoose from "mongoose";
const Schema = mongoose.Schema;


const ReportPost = new Schema({
    reason: {type: String, require: true},
    post_id: {type: Schema.Types.ObjectId, ref: 'Post', require: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    status: {type: String, require: true} /*  */
}, {timestamps: true, minimize: false});

module.exports = mongoose.models.ReportPost || mongoose.model('ReportPost', ReportPost);