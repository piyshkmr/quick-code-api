const CheatSheet = require("../models/CheatSheet");

const cheatSheetAuth = async (req, res, next) => {
  const cheatSheetId = req.params.id;
  try {
    //   getting  cheatSheet
    const cheatSheet = await CheatSheet.findById(cheatSheetId);

    if (cheatSheet.userId === req.user.user_id) {
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: "cheatsheet not found" });
  }
};

module.exports = cheatSheetAuth;
