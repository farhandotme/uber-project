const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./DB/connection");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const userRouter = require("./routes/user.routes");

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// routes-----
app.use("/users", userRouter);

// PORT --- and connection DB
const port = process.env.PORT;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
