const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url);
}; //returning a promise

module.exports = connectDB; //returning a promise
