const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token }); //this is same as .json{token : token}
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS, // the token will expire after 15 minutes
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};
