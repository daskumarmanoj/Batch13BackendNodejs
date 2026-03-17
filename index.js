require("dotenv").config();
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRoute");
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is Runing On Port", port);
  connectDB();
});
