const Order = require("../models/orderModel.js");
const Product = require("../models/productModel.js");

class productController {
  async getAll(req, res, next) {
    try {
      const allOrder = await Order.find();
      if (allOrder === null) {
        return res.status(200).json({
          status: "404",
          message: "out of order in stock!",
        });
      } else {
        return res.status(200).json({
          status: "OK",
          message: `select orders successfully`,
          data: allOrder,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "catch error",
        message: error.message,
      });
    }
  }

  async createOrder(req, res, next) {
    try {
      const {
        name,
        amount,
        price,
        discount,
        productId,
        shippingAddress,
        phoneNumber,
        totalPrice,
        isPaid,
        isDelivered,
      } = req.body;
      const createOrder = await Order.create({
        name,
        amount,
        price,
        discount,
        productId,
        shippingAddress,
        phoneNumber,
        totalPrice,
        isPaid,
        isDelivered,
      });
      if (createOrder) {
        const product = await Product.findOne({ _id: createOrder.productId });
        const stockHandle = await Product.findByIdAndUpdate(
          { _id: createOrder.productId },
          { countInStock: product.countInStock - createOrder.amount },
          {new:true}
        );
        if (stockHandle) console.log("handle success");
        return res.status(200).json({
          status: "OK",
          message: "success",
          data: createOrder,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "catch error",
        message: error.message,
      });
    }
  }

  async updateOrder(req, res) {
    const orderId = req.params.id;
    try {
      const updateOrder = await Order.findByIdAndUpdate(
        { _id: orderId },
        req.body,
        { new: true }
      );
      if (updateOrder === null) {
        return res.status(400).json({
          status: "not found",
          message: "order not found!",
        });
      } else if (!orderId) {
        return res.status(400).json({
          status: "not found",
          message: "product id param not found!",
        });
      } else {
        return res.status(200).json({
          status: "OK",
          message: "update product successfully",
          data: updateOrder,
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
