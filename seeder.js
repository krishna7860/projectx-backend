const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const User = require("./models/User");
const State = require("./models/State");
const City = require("./models/City");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const states = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/states.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    const statesArray = Object.keys(states).map((item) => ({
      title: item,
    }));
    await State.create(statesArray);

    for (let state of statesArray) {
      let stateId = await State.findOne({ title: state.title });
      let cities = states[state.title].map((item) => ({
        name: item,
        stateId: stateId.id,
      }));
      await City.create(cities);
    }

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await State.deleteMany();
    await City.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
