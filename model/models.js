const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Provide a username"],
    trim: true,
  },
});

const ExercisesSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Provide a description"],
  },
  duration: {
    type: Number,
    required: [true, "Provide a duration"],
  },
  date: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: String,
    required: [true, "user id"],
  },
});

const User = mongoose.model("User", UserSchema);
const Exercise = mongoose.model("Exercise", ExercisesSchema);

module.exports = {
  User,
  Exercise,
};
