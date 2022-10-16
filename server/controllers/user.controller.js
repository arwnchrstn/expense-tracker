const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const cookieOptions = require("../utils/cookie.options");
const userObject = require("../utils/user.object");
const generateToken = require("../utils/generateToken");

//get user on refresh controller
//status codes: (200, 204, 404)
const getUserRefresh = async (req, res) => {
  try {
    const { refresh_token_et } = req.cookies;

    //check if there is a refresh token
    if (!refresh_token_et)
      return res
        .cookie("refresh_token_et", "", { ...cookieOptions, maxAge: 0 })
        .status(204)
        .send();

    //validate refresh token
    const decoded = jwt.verify(
      refresh_token_et,
      process.env.REFRESH_SECRET,
      (error, value) => {
        if (error)
          return res
            .cookie("refresh_token_et", "", { ...cookieOptions, maxAge: 0 })
            .status(401)
            .json({ message: "Unauthorized" });

        return value;
      }
    );

    //fetch user data
    const existingUser = await User.findById(decoded.userId, "-password");

    //check if there is an existing user
    if (!existingUser)
      return res
        .cookie("refresh_token_et", "", { ...cookieOptions, maxAge: 0 })
        .status(404)
        .json({ message: "No user found" });

    //sign access token
    const accessToken = generateToken.accessToken(existingUser._id);

    //send user data
    res.json(userObject(existingUser, accessToken));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//user logout controller
//status codes: (200)
const logout = async (req, res) => {
  res.cookie("refresh_token_et", "", { ...cookieOptions, maxAge: 0 }).send();
};

module.exports = {
  getUserRefresh,
  logout
};
