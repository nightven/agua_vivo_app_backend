const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { httpError, ctrlWrapper } = require("../helpers");
const {
  findUserByEmail,
  userCollection,
  findUserById,
} = require("../db/services/userServices");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail({ email });

  if (user) {
    throw httpError(409, "Email in use");
  }

  const avatar = gravatar.url(email);

  const newUser = userCollection({ ...req.body, avatar });
  await newUser.hashPassword();

  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await findUserById(newUser._id, { token });

  res.status(201).json({
    token,
    user: { email, avatar },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail({ email });

  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }
};

module.exports = {
  register: ctrlWrapper(register),
};
