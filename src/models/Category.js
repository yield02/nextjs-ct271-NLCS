import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    category_name: { type: String, require: true},
    description: { type: String },
    newPost: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    numberPost: {type: Number, default: 0},
});

  
module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema);
