const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * @param id User ID to be signed using JWT
   * @return Returns a signed JWT access token
   */
  accessToken: (id) => {
    return jwt.sign({ userId: id }, process.env.ACCESS_SECRET, {
      expiresIn: "10m"
    });
  },
  /**
   * @param id User ID to be signed using JWT
   * @return Returns a signed JWT refresh token
   */
  refreshToken: (id) => {
    return jwt.sign({ userId: id }, process.env.REFRESH_SECRET, {
      expiresIn: "7d"
    });
  }
};
