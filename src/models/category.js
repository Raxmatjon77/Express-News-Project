const mongoose = require("mongoose");

// Define user schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Create and export User model
const News = mongoose.model("Category", categorySchema);

module.exports = News;
