const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    token = token.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_TOKEN);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = auth;
