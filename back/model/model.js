const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,

  },
  password: {
    type: String,
    required: true,
  },
  card: [
    {
      img: String,
      name: String,
      price: String,
      count: {
        type: Number,
        default: 1,
        min: 1
      },
      id: String,
    },
  ],
});

const loginModel = mongoose.model("login", schema);
module.exports = loginModel;
