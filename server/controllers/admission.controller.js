const bcrypt = require("bcryptjs");
const registerValidator = require("../utils/validators/register.validator");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const userObject = require("../utils/user.object");
const cookieOptions = require("../utils/cookie.options");

//login controller
//status codes: (200, 400, 404, 500)
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //check if username and password is empty
    if (!username || !password)
      return res.status(400).send("Please enter your username and password");

    //check if there is an existing user
    const existingUser = await User.findOne({ username });
    //check if credentials are correct
    if (!existingUser)
      return res.status(404).send("Username/password is incorrect");

    //compare password from the database
    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );
    //check is password matched
    if (!passwordMatched)
      return res.status(404).send("Username/password is incorrect");

    //sign access token and refresh token if credentials are correct
    const accessToken = generateToken.accessToken(existingUser._id);
    const refreshToken = generateToken.refreshToken(existingUser._id);

    //send user data
    res
      .cookie("refresh_token_et", refreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7 * 1000
      })
      .json(userObject(existingUser, accessToken));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//register account controller
//status codes: (201, 400, 409, 500)
const register = async (req, res) => {
  try {
    const { error, value } = registerValidator(req.body);

    //check if there are errors in request body
    if (error) return res.status(400).send(error.details[0].message);

    //check if there is existing user
    const existingUser = await User.findOne({ username: value.username });
    if (existingUser) return res.status(409).send("Username already exists");

    //encrypt password
    const SALT = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, SALT);

    //save user to the database
    const createdUser = await User.createUser(value.username, hashedPassword);

    //sign tokens
    const access_token = generateToken.accessToken(createdUser._id);
    const refresh_token = generateToken.refreshToken(createdUser._id);

    //send access token to client, send refresh token to http cookie
    res
      .cookie("refresh_token_et", refresh_token, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7 * 1000
      })
      .status(201)
      .json(userObject(createdUser, access_token));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  login,
  register
};
