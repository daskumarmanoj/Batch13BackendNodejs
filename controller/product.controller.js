const { cloudinary } = require("../config/cloudinary");
const productModel = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category } = req.body;

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "prduct",
      });
      imageUrl = result.secure_url;
    }

    const product = await productModel.create({
      name,
      price,
      description,
      stock,
      category,
      image: imageUrl,
      createdBy: req.user._id,
    });

    return res.status(200).json({
      message: "Product Create SuccessFully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error when Create Product",
      error: error.message,
    });
  }
};

module.exports = { createProduct };
