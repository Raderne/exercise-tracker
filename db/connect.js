const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url).then(() => console.log("connected to DB..."));
};

module.exports = connectDB;
