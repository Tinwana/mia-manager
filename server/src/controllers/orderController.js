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
          data: req.orderService,
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
        size,
        amount,
        discount,
        nameProduct,
        shippingAddress,
        phoneNumber,
        isPaid,
        isDelivered,
      } = req.body;
      const product = await Product.findOne({ name: nameProduct });
      const price = product.price;
      const createOrder = await Order.create({
        name,
        size,
        amount,
        price,
        discount,
        nameProduct,
        shippingAddress,
        phoneNumber,
        isPaid,
        isDelivered,
      });
      if (createOrder) {
        const stockHandle = await Product.findOneAndUpdate(
          { name: createOrder.nameProduct },
          {
            countInStock: product.countInStock - createOrder.amount,
            soldInMonth: (product.soldInMonth += createOrder.amount),
            soldAll:(product.soldAll += createOrder.amount)
          },
          { new: true }
        );

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

  async getDetail(req, res, next) {
    try {
      const orderId = req.params.orderId;
      const detailOrder = await Order.findOne({ _id: orderId });
      if (detailOrder === null) {
        return res.status(404).json({
          status: "not found",
          message: "Order not found!",
        });
      } else {
        return res.status(200).json({
          status: "OK",
          message: "get detail order successfully",
          data: detailOrder,
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
