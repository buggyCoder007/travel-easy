const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;
mongoServer.getUri("ola_returns").then(mongoUri => {
  const mongooseOpts = {
    useNewUrlParser:true,
    useUnifiedTopology:true
  };

  mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on("error", e => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
});
