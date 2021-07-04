const bcrypt = require("bcrypt");
const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({ Message: "New User created!" });
  } catch (error) {
    next(error);
  }
};
