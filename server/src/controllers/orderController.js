const Order = require("../models/orderModel.js");
const Product = require("../models/productModel.js");
const Customer = require("../models/customerModel.js");

class orderController {
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
        productId,
        shippingAddress,
        phoneNumber,
        isPaid,
        isDelivered,
      } = req.body;
      const product = await Product.findOne({
        $and: [{ productId: productId }, { size: size }],
      });
      let price;
      if (product !== null) {
        price = product.price;
        if (product.countInStock < amount) {
          return res.status(400).json({
            status: "error",
            message: "out of stock",
          });
        }
      } else {
        return res.status(400).json({
          status: "error",
          message: "product don't have in store",
        });
      }
      const createOrder = await Order.create({
        name,
        size,
        amount,
        price,
        discount,
        productId,
        shippingAddress,
        phoneNumber,
        isPaid,
        isDelivered,
      });
      if (createOrder) {
        const stockHandle = await Product.findOneAndUpdate(
          {
            $and: [
              { productId: createOrder.productId },
              { size: createOrder.size },
            ],
          },
          {
            countInStock:
              product.countInStock - createOrder.amount < 0
                ? 0
                : product.countInStock - createOrder.amount,
            soldInMonth: (product.soldInMonth += createOrder.amount),
            soldAll: (product.soldAll += createOrder.amount),
          },
          { new: true }
        );
        const checkCustomer = await Customer.findOne({ phone: phoneNumber });
        if (checkCustomer === null) {
          const customerHandle = await Customer.create({
            name: name,
            phone: phoneNumber,
            address: shippingAddress,
          });
        } else {
          if (name !== checkCustomer.name) {
            const updateName = await Customer.findOneAndUpdate(
              { phone: phoneNumber },
              { name },
              { new: true }
            );
          }
        }

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
      const product = await Product.findOne({ productId: req.body.productId });
      if(!product){
        return res.status(400).json({
          status: "not found",
          message: "product id not found!",
        });
      }
      const order = await Order.findOne({ productId: req.body.productId });
      let oldOrderAmount = order?.amount || 0;
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
        if (updateOrder) {
          const stockHandle = await Product.findOneAndUpdate(
            { productId: updateOrder.productId },
            {
              countInStock:
                product?.countInStock - (updateOrder?.amount - oldOrderAmount) < 0
                  ? 0
                  : product?.countInStock -
                    (updateOrder?.amount - oldOrderAmount),
              soldInMonth: (product.soldInMonth += (updateOrder?.amount - oldOrderAmount)),
              soldAll: (product.soldAll += (updateOrder?.amount - oldOrderAmount)),
            },
            { new: true }
          );
          const checkCustomer = await Customer.findOne({
            phone: req.body.phoneNumber,
          });
          if (checkCustomer === null) {
            const customerHandle = await Customer.create({
              name: req.body.name,
              phone: req.body.phoneNumber,
              address: req.body.shippingAddress,
            });
          } else {
            if (req.body.name !== checkCustomer.name) {
              const updateName = await Customer.findOneAndUpdate(
                { phone: req.body.phoneNumber },
                { name: req.body.name },
                { new: true }
              );
            }
          }

          return res.status(200).json({
            status: "OK",
            message: "update product successfully",
            data: updateOrder,
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
module.exports = new orderController();
