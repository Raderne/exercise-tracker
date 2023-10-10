const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  createExercise,
  getAllUsersExercisesLogs,
} = require("../controllers/user");

router.route("/").post(createUser).get(getUsers);
router.route("/:_id/exercises").post(createExercise);
router.route("/:_id/logs").get(getAllUsersExercisesLogs);

module.exports = router;
