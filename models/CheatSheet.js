const mongoose = require("mongoose");

const requiredString = {
  required: true,
  type: "string",
};

const cheatSheetSchema = new mongoose.Schema(
  {
    name: {
      ...requiredString,
      minLength: 2,
    },
    description: {
      ...requiredString,
      maxLength: 200,
    },
    codes: [
      {
        title: String,
        body: String,
      },
    ],
    userId: {
      ...requiredString,
    },
  },
  { timeStamp: true }
);

module.exports = new mongoose.model("cheatsheet", cheatSheetSchema);
