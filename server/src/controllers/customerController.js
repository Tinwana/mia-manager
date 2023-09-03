const Customer = require("../models/customerModel.js");

class customerController {
  async getAll(req, res, next) {
    try {
      const allCustomer = await Customer.find();
      if (allCustomer === null) {
        return res.status(200).json({
          status: "OK",
          message: "out of Customer in stock!",
        });
      } else {
        return res.status(200).json({
          status: "OK",
          message: `select Customers successfully`,
          data: req.customerService,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "catch error",
        message: error.message,
      });
    }
  }
  async updateCustomer(req, res) {
    const customerId = req.params.id;
    try {
      const updateCustomer = await Customer.findByIdAndUpdate(
        { _id: customerId },
        req.body,
        { new: true }
      );
      if (updateCustomer === null) {
        return res.status(400).json({
          status: "not found",
          message: "order not found!",
        });
      } else if (!customerId) {
        return res.status(400).json({
          status: "not found",
          message: "product id param not found!",
        });
      } else {
        return res.status(200).json({
          status: "OK",
          message: "update product successfully",
          data: updateCustomer,
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
      const customerId = req.params.customerId;
      const detailCustomer = await Customer.findOne({ _id: customerId });
      if (detailCustomer === null) {
        return res.status(404).json({
          status: "not found",
          message: "customer not found!",
        });
      } else {
        return res.status(200).json({
          status: "OK",
          message: "get detail customer successfully",
          data: detailCustomer,
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

module.exports = new customerController();
