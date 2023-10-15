import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Category = new Schema({
    category_name: {type: String, require: true},
    description: {type: String},
});

module.exports = mongoose.models.Category || mongoose.model('Category', Category);