require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const mongoConnect = require("./connection/mongodb_connect");
const userRouter = require("./routes/user.routes");
const admissionRouter = require("./routes/admission.routes");
const refreshRouter = require("./routes/refresh.routes");

//connect to Mongo DB Atlas
mongoConnect();

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

//router setup
app.use("/api/user", userRouter);
app.use("/api/admission", admissionRouter);
app.use("/api/refresh", refreshRouter);

//test route
app.get("/test", (req, res) => {
  res.send("Success");
});

//port listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
