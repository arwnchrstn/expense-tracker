const jwt = require("jsonwebtoken");

//authenticate access token middleware
module.exports = async (req, res, next) => {
  try {
    const accessToken =
      req.headers["Authorization"] || req.headers["authorization"];

    //validate access token from authorization header
    jwt.verify(
      accessToken.split(" ")[1],
      process.env.ACCESS_SECRET,
      (error, value) => {
        if (error) return res.status(403).json({ message: "Forbidden" });

        //return user id to the next middleware/route
        req.user = value.userId;
        next();
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
