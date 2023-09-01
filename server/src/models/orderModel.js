const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    size:{ type: String},
    amount: { type: Number, required: true },
    price: { type: Number, default: 0},
    discount: { type: Number , default: 0},
    nameProduct: {
      type: String,
      required: true,
    },
    shippingAddress: { type: String },
    phoneNumber: { type: String },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
