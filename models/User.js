const mongoose = require("mongoose");

const requiredString = {
  required: true,
  type: "string",
};

const userSchema = new mongoose.Schema(
  {
    name: {
      ...requiredString,
      minLength: 3,
    },
    email: {
      ...requiredString,
      unique: true,
    },
    password: {
      ...requiredString,
      minLength: 6,
    },
    token: {
      ...requiredString,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", userSchema);
