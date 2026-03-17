const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.json({
        message: "User Already Exists",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      role,
      password: hashedpassword,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sucure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 100,
    });

    res.status(201).json({
      message: "Register SuccessFully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "User Register Error",
      error: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email Or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email Or Password",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sucure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 100,
    });

    res.json({
      message: "Login SuccessFully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "User Login Error",
      error: error.message,
    });
  }
};

const LogOut = async (req, res) => {
  try {
    res.cookie("token", " ", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.json({
      message: "Logout Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { Register, Login, LogOut };
