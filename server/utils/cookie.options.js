module.exports = Object.freeze({
  httpOnly: process.env.NODE_ENV === "production" ? true : false,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "",
  maxAge: 60 * 60 * 24 * 7 * 1000
});
