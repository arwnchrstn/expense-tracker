const mongoose = require("mongoose");

//username regex
const USERNAME_VALIDATOR = /^[a-z0-9]([._-](?![._-])|[a-z0-9]){3,18}[a-z0-9]$/;

//user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 5,
    max: 30,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: (username) => {
        return USERNAME_VALIDATOR.test(username);
      },
      message:
        "Username must only contain lowercase letters, numbers, and underscore. No underscore at the beginning and ending of the username."
    }
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  transactions: [
    {
      type: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true,
        min: 1,
        max: 1000000000000000
      }
    }
  ]
});

//create user method
userSchema.static("createUser", function (username, password) {
  return this.create({ username, password });
});

//export model
module.exports = mongoose.model("user", userSchema);
