import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    category_name: { type: String, require: true},
    description: { type: String },
}, {
  method: {
    findFromID: function(id) {
      return mongoose.model('Category').findOne({_id: id});
    }
  }
});

  
module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema);
