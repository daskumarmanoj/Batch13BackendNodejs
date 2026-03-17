const express = require("express");
const { createProduct } = require("../controller/product.controller");
const upload = require("../middleware/upload");
const Protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-product",Protect, upload.single("image"), createProduct);

module.exports = router;
