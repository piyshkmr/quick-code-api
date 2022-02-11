const router = require("express").Router();
const auth = require("../middlewares/auth");
const cheatSheetAuth = require("../middlewares/cheatsheet");
const {
  getAllCheatSheets,
  addCheatSheet,
  getCheatSheet,
  addCodeOnCheatSheet,
  updateCodeOnCheatSheet,
  deleteCodeOnCheatSheet,
  deleteCheatSheet,
  updateCheatSheet,
} = require("../controllers/cheatSheetControllers");

router.use(auth);

// getting all cheatSheets
router.get("/", getAllCheatSheets);

// add cheatSheet
router.post("/", addCheatSheet);

// get single cheatSheet
router.get("/:id", cheatSheetAuth, getCheatSheet);

// update single cheetSheet
router.patch("/:id", cheatSheetAuth, updateCheatSheet);

// delete single cheetSheet
router.delete("/:id", cheatSheetAuth, deleteCheatSheet);

// add code on cheetSheet
router.post("/:id/codes", cheatSheetAuth, addCodeOnCheatSheet);

// update code on cheetSheet
router.patch("/:id/codes/:codeid", cheatSheetAuth, updateCodeOnCheatSheet);

// delete code on cheetSheet
router.delete("/:id/codes/:codeid", cheatSheetAuth, deleteCodeOnCheatSheet);

module.exports = router;
