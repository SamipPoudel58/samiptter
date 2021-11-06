const express = require("express");
const path = require("path");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const tweetRoute = require("./routes/tweetRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const uploadRoute = require("./routes/uploadRoute");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/tweets", tweetRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/upload", uploadRoute);

const rootdir = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// serving the frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(rootdir, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(rootdir, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const server = app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
  );
});

const io = require("./socket").init(server);
io.on("connection", (socket) => {
  console.log("Client Connected");
  socket.on("disconnect", () => {
    console.log("Client has left");
  });
});
