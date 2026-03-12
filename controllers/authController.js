const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {

  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(401).json({ message: "Invalid username" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

//   const token = jwt.sign(
//     { userId: user._id },
//     "mysecretkey",
//     { expiresIn: "1h" }
//   );

const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRE }
);

  res.json({ token });
};