const mongoose = require("mongoose");

module.exports = async function () {
  // Disconnect from the MongoDB server after all tests
  await mongoose.disconnect();
};
