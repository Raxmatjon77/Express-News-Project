const mongoose = require("mongoose");

// Define user schema
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {type:String},

  category:{
   type: Schema.Types.ObjectId,
    ref: "Category"}
  ,

  createdAt: {
    type: Date,
    default: Date.now,
  }}
);

// Create and export User model
const News = mongoose.model("News", newsSchema);

module.exports = News;