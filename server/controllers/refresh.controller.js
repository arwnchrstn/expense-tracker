const jwt = require("jsonwebtoken");
const cookieOptions = require("../utils/cookie.options");
const generateToken = require("../utils/generateToken");

//refresh token controller
//generate new access token
//status codes: (200, 401, 500)
module.exports = async (req, res) => {
  try {
    const { refresh_token_et } = req.cookies;

    //check if there is a refresh token
    if (!refresh_token_et)
      return res
        .cookie("refresh_token_et", "", { ...cookieOptions, maxAge: 0 })
        .status(401)
        .send("Unauthorized");

    //verify refresh token
    const decoded = jwt.verify(
      refresh_token_et,
      process.env.REFRESH_SECRET,
      (error, value) => {
        if (error)
          return res
            .cookie("refresh_token_et", "", { ...cookieOptions, maxAge: 0 })
            .status(401)
            .send("Unauthorized");

        return value;
      }
    );

    //sign new token if refresh token is valid
    const newAccessToken = generateToken.accessToken(decoded.userId);

    //send new access token
    res.send(newAccessToken);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
