const mongoose = require("mongoose");
const Category=require("./category")
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
newsSchema.pre("save", async function (next) {
  const category = await Category.findById(this.category);
  if (!category) {
    throw new Error("Invalid category reference");
  }
  next();
});

// Create and export User model
const News = mongoose.model("News", newsSchema);

module.exports = News;