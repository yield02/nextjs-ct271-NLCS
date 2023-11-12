import mongoose from "mongoose";
const Schema = mongoose.Schema;


const ReportComment = new Schema({
    reason: {type: String, require: true},
    comment_id: {type: Schema.Types.ObjectId, ref: 'Comment', require: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    status: {type: String, require: true} /*  */
}, {timestamps: true, minimize: false});

module.exports = mongoose.models.ReportComment || mongoose.model('ReportComment', ReportComment);