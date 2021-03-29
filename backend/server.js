const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const tweetRoute = require("./routes/tweetRoute");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
dotenv.config();

const app = express();
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ creator: "Samip", stack: "MERN" });
});
app.use("/api/users", userRoute);
app.use("/api/tweets", tweetRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
  );
});
