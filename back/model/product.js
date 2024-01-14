const mongoose = require("mongoose");

const schema = mongoose.Schema({

  img: String,
  name: String,
  rating: String,
  categori: String,

});

const productModel = mongoose.model("product", schema);
module.exports = productModel;
