const Product = require("../models/productModel.js");

class productController {
  async getAll(req, res, next) {
    try {
      const allProduct = await Product.find();
      if (allProduct === null) {
        return res.status(200).json({
          status: "404",
          message: "out of product in stock!",
        });
      } else {
        return res.status(200).json({
          status: "OK",
          message: `select products successfully`,
          data: req.productService,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "catch error",
        message: error.message,
      });
    }
  }

  async detailProduct(req, res, next) {
    try {
      const productId = req.params.id;
      const detailProduct = await Product.findOne({ _id: productId });
      if (detailProduct === null) {
        return res.status(404).json({
          status: "not found",
          message: "Product not found!",
        });
      } else {
        return res.status(200).json({
          status: "OK",
          message: "get detail product successfully",
          data: detailProduct,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "catch error",
        message: error.message,
      });
    }
  }

  async createProduct(req, res, next) {
    try {
      const {
        name,
        image,
        size,
        type,
        wholesalePrice,
        price,
        countInStock,
        description,
      } = req.body;
      const checkProduct = await Product.findOne({ name: name });
      if (checkProduct !== null) {
        return res.status(400).json({
          status: "error",
          message: "name of product is already in used",
        });
      } else {
        const createProduct = await Product.create({
          name,
          image,
          size,
          type,
          price,
          wholesalePrice,
          countInStock,
          description,
        });
        if (createProduct) {
          return res.status(200).json({
            status: "OK",
            message: "success",
            data: createProduct,
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: "catch error",
        message: error.message,
      });
    }
  }

  async updateProduct(req, res) {
      const productId = req.params.id;
      try {
      const updateProduct = await Product.findByIdAndUpdate(
        { _id: productId },
        req.body,
        { new: true }
      );
      if (updateProduct === null) {
        return res.status(400).json({
          status: "not found",
          message: "product not found!",
        });
      } else if (!productId) {
        return res.status(400).json({
          status: "not found",
          message: "product id param not found!",
        });
      }
      else{
        return res.status(200).json({
            status: "OK",
            message: "update product successfully",
            data: updateProduct,
          });
      }
    } catch (error) {
      return res.status(500).json({
        status: "catch error",
        message: error.message,
      });
    }
  }
}

module.exports = new productController();
