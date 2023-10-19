import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    category_name: { type: String, require: true },
    description: { type: String },
  });
  
  module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema);
