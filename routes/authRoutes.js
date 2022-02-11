const router = require("express").Router();
const { body } = require("express-validator");
const { register, login } = require("../controllers/authControllers");

// register user
router.post(
  "/register",
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  register
);

// login user
router.post("/login", login);

module.exports = router;
