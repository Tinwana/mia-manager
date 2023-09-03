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
        size,
        type,
        wholesalePriceChina,
        wholesalePrice,
        priceChina,
        price,
        countInStock,
        description,
      } = req.body;
      let productId = 0;
      const checkProduct = await Product.findOne({
        $and: [{ name: name, size: size }],
      });
      if (checkProduct !== null) {
        return res.status(400).json({
          status: "error",
          message: "name of product is already in used",
        });
      } else {
        const latestProduct = await Product.findOne({}).sort({
          productId: "desc",
        });
        if (latestProduct !== null) {
          const checkName = await Product.findOne({ name });
          if (checkName === null) {
            productId = parseInt(latestProduct.productId) + 1;
          } else {
            productId = parseInt(latestProduct.productId);
          }
        } else {
          productId = 100;
        }
        productId = productId.toString();
        const createProduct = await Product.create({
          productId: productId,
          name,
          size,
          type,
          wholesalePriceChina,
          wholesalePrice,
          priceChina,
          price,
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
      } else {
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
