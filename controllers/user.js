const { User, Exercise } = require("../model/models");

const getUsers = async (req, res) => {
  try {
    const user = await User.find({}).select("_id username");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ username: user.username, _id: user._id });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createExercise = async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      res.status(404).json({ msg: "No user with that id" });
      return;
    }
    const exercise = await Exercise.create({
      userId: user._id,
      description,
      duration,
      date: date ? new Date(date) : new Date(),
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString(),
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAllUsersExercisesLogs = async (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      res.status(404).json({ msg: "No user with that id" });
      return;
    }
    let dateObj = {};
    if (from) {
      dateObj["$gte"] = new Date(from);
    }
    if (to) {
      dateObj["$lte"] = new Date(to);
    }

    let filter = {
      userId: _id,
    };
    if (from || to) {
      filter.date = dateObj;
    }

    const exercise = await Exercise.find(filter).limit(+limit ?? 1000);
    const count = exercise.length;

    const log = exercise.map((ex) => ({
      description: ex.description,
      duration: ex.duration,
      date: ex.date.toDateString(),
    }));

    res.status(200).json({
      _id: user._id,
      username: user.username,
      count: count,
      log,
    });
  } catch (error) {
    res.status(500).json({ msg: error + "--- cant get all logs" });
  }
};

module.exports = {
  getUsers,
  createExercise,
  createUser,
  getAllUsersExercisesLogs,
};
