require("dotenv").config();
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRoute");
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// ✅ CORS CONFIG (IMPORTANT for Cookies)
app.use(
  cors({
    origin: true, // ✅ allow all domains dynamically
    credentials: true, // ✅ allow cookies
  })
);

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

// ✅ Start Server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server is Running On Port", port);
  connectDB();
});
