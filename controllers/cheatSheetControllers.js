const CheatSheet = require("../models/CheatSheet");

// cheatSheet
const getAllCheatSheets = async (req, res) => {
  try {
    //   getting all cheatSheet
    const allCheatSheets = await CheatSheet.find({}, { codes: 0 });
    const userCheatSheets = allCheatSheets.filter(
      (e) => e.userId === req.user.user_id
    );
    return res.status(200).json(userCheatSheets);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const addCheatSheet = async (req, res) => {
  //   getting all data
  const { name, description } = req.body;
  // checking empty value
  if (!name || !description)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const cheatSheet = new CheatSheet({
      name: name,
      description: description,
      userId: req.user.user_id,
    });
    await cheatSheet.save();
    return res.status(201).json(cheatSheet);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getCheatSheet = async (req, res) => {
  try {
    //   getting  cheatSheet
    const cheatSheet = await CheatSheet.findById(req.params.id);
    return res.status(200).json(cheatSheet);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updateCheatSheet = async (req, res) => {
  try {
    //   getting  cheatSheet and updatecheatSheet
    const cheatSheet = await CheatSheet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(cheatSheet);
  } catch (err) {
    return res.status(400).json({ errors: [err.message] });
  }
};

const deleteCheatSheet = async (req, res) => {
  try {
    //   getting  cheatSheet and deletecheatSheet
    const cheatSheet = await CheatSheet.findByIdAndDelete(req.params.id);
    return res.status(200).json(cheatSheet);
  } catch (err) {
    return res.status(400).json({ errors: [err.message] });
  }
};

// code in cheatSheet
const addCodeOnCheatSheet = async (req, res) => {
  try {
    //   getting  cheatSheet
    const cheatSheet = await CheatSheet.findById(req.params.id);

    // getting codes
    const { title, body } = req.body;

    cheatSheet.codes.push({ title, body });

    await cheatSheet.save();

    return res.status(201).json(cheatSheet);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updateCodeOnCheatSheet = async (req, res) => {
  try {
    //   getting  cheatSheet
    const cheatSheet = await CheatSheet.findById(req.params.id);

    // finding the index of code in cheatSheet.codes
    const index = cheatSheet.codes.findIndex(
      (e) => e._id.toString() === req.params.codeid
    );

    // checking if the index is -1 then return

    if (index === -1)
      return res
        .status(400)
        .json({ errors: ["no code found with id " + req.params.codeid] });

    const selectedCode = cheatSheet.codes[index];

    // overwriting values
    selectedCode.title = req.body.title;
    selectedCode.body = req.body.body;

    // selected updated code to cheatSheet
    cheatSheet.codes[index] = selectedCode;

    await cheatSheet.save();

    return res.status(200).json(selectedCode);
  } catch (err) {
    return res.status(400).json({ errors: [err.message] });
  }
};

const deleteCodeOnCheatSheet = async (req, res) => {
  try {
    //   getting  cheatSheet
    const cheatSheet = await CheatSheet.findById(req.params.id);

    // finding the index of code in cheatSheet.codes
    const index = cheatSheet.codes.findIndex(
      (e) => e._id.toString() === req.params.codeid
    );

    // checking if the index is -1 then return
    if (index === -1)
      return res
        .status(400)
        .json({ errors: ["no code found with id " + req.params.codeid] });

    const codes = cheatSheet.codes.splice(index, 1);

    await cheatSheet.save();

    return res.status(200).json(codes);
  } catch (err) {
    return res.status(400).json({ errors: [err.message] });
  }
};

module.exports = {
  getAllCheatSheets,
  addCheatSheet,
  getCheatSheet,
  addCodeOnCheatSheet,
  updateCodeOnCheatSheet,
  deleteCodeOnCheatSheet,
  deleteCheatSheet,
  updateCheatSheet,
};
