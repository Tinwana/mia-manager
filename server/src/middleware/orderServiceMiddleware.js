const Order = require("../models/orderModel");

const orderServiceMiddleware = async (req, res, next) => {
  if (req.query.sort !== "asc" && req.query.sort !== "desc") {
    req.query.sort = "desc";
  }
  const filterBy = req.query.filter;
  const filterValue = req.query.filter_value;
  let escapeFilterValue;
  const sort = req.query.sort;
  const sortBy = req.query.sort_by || "name";
  let allOrder = await Order.find();

  if (!!sort || !!sortBy) {
    allOrder = await Order.find().sort({ [sortBy]: sort });
  }
  if (!!filterValue && !!filterBy) {
    escapeFilterValue = filterValue.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
    allOrder = await Order.find({
      [filterBy]: { $regex: new RegExp(escapeFilterValue, "i")},
    });
  }
  const limit =
    parseInt(req.query.limit) > allOrder.length + 1
      ? allOrder.length + 1
      : parseInt(req.query.limit) || allOrder.length;
  let page =
    parseInt(req.query.limit) > allOrder.length + 1
      ? 1
      : parseInt(req.query.page) || 1;
  const totalPages = Math.ceil(allOrder.length / limit);
  if (page > totalPages) page = 1;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  let stateGetProduct;
  if (limit === allOrder.length) {
    stateGetProduct = "all";
  } else {
    stateGetProduct = "";
  }
  const orderService = allOrder.slice(startIndex, endIndex);
  req.orderService = {
    stateGetProduct,
    currentPage: page,
    totalPages,
    limit,
    orders: orderService,
  };
  next();
};
module.exports = orderServiceMiddleware;
