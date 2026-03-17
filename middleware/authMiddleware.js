const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const Protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRETE);
  req.user = await userModel.findById(decode.id);
  next();
};

module.exports = Protect;
