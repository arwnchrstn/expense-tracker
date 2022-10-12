const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    process.env.DB_URI,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
      if (err) return console.log(err);

      console.log("Connected to Mongo DB Atlas");
    }
  );
};
