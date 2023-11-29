const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

module.exports = async function () {
  // Only start the server if it hasn't been started yet
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Set the MongoDB URI as an environment variable
    process.env.MONGODB_URI = mongoUri;

    // Connect to the MongoDB server
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

// Global teardown function to stop the MongoDB server
module.exports = async function () {
  if (mongoServer) {
    await mongoServer.stop();
  }
};
