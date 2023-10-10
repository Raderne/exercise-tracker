const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const router = require("./routes/user");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/api/users", router);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const listener = app.listen(process.env.PORT || 3000, () => {
      console.log("Your app is listening on port " + listener.address().port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
