const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  // checking errors
  const errors = validationResult(req);
  //   if found any errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //   getting all data from body
  const { name, email, password, cPassword } = req.body;

  //   mathing the password
  if (password === cPassword) {
    try {
      //   hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
      //  creating new user
      const user = new User({ name, email, password: hashedPassword });
      // generatig the token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      // setting token
      user.token = token;
      await user.save();
      return res.status(201).json(user);
    } catch (err) {
      // cheking if email alredy exist
      if (err.code === 11000) {
        return res.status(400).json({ error: "Email id is already in use" });
      }
    }
  } else {
    return res.status(400).json({ error: "Passwords are not matching" });
  }
};

const login = async (req, res) => {
  //   getting all data from body
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(401).json({ error: "all fields are required" });

  // getting user from email
  const user = await User.findOne({ email: email });

  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  //   comparing the passwords
  const isPasswordsMatch = await bcrypt.compare(password, user.password);

  if (isPasswordsMatch) {
    // generating  the new token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    // saving token
    user.token = token;

    await user.save();

    return res.status(200).json(user);
  } else {
    return res.status(400).json({ error: "Invalid credentials" });
  }
};

module.exports = {
  register,
  login,
};
