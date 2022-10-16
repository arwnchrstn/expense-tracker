require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimiter = require("express-rate-limit");
const PORT = process.env.PORT || 5000;
const mongoConnect = require("./connection/mongodb_connect");
const userRouter = require("./routes/user.routes");
const admissionRouter = require("./routes/admission.routes");
const refreshRouter = require("./routes/refresh.routes");
const transactionRouter = require("./routes/transaction.routes");

//connect to Mongo DB Atlas
mongoConnect();

//disable headers for more security
app.disable("x-powered-by");

//use middlewares
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: [process.env.ORIGIN]
  })
);
app.use(cookieParser());
app.use(express.json());

//rate limiter
const rateLimit = rateLimiter({
  windowMs: 45000,
  max: 5,
  message: (req, res) => {
    console.log(req);
    res.status(429).json({
      message: `Too many requests. Please try again after ${parseInt(
        (new Date(req.rateLimit.resetTime).getTime() - new Date().getTime()) /
          1000
      )} second(s)`
    });
  },
  legacyHeaders: false
});

//router setup
app.use("/api/user", userRouter);
app.use("/api/admission", rateLimit, admissionRouter);
app.use("/api/refresh", refreshRouter);
app.use("/api/transaction", rateLimit, transactionRouter);

//test route
app.get("/test", (req, res) => {
  res.send("Success");
});

//port listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
