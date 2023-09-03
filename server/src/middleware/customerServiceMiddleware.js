const Customer = require("../models/customerModel");

const customerServiceMiddleware = async (req, res, next) => {
  if (req.query.sort !== "asc" && req.query.sort !== "desc") {
    req.query.sort = "desc";
  }
  const filterBy = req.query.filter;
  const filterValue = req.query.filter_value;
  let escapeFilterValue;
  const sort = req.query.sort;
  const sortBy = req.query.sort_by || "createdAt";
  let allCustomer = await Customer.find();

  if (!!sort || !!sortBy) {
    allCustomer = await Customer.find().sort({ [sortBy]: sort });
  }
  if (!!filterValue && !!filterBy) {
    escapeFilterValue = filterValue.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
    allCustomer = await Customer.find({
      [filterBy]: { $regex: new RegExp(escapeFilterValue, "i")},
    });
  }
  const limit =
    parseInt(req.query.limit) > allCustomer.length + 1
      ? allCustomer.length + 1
      : parseInt(req.query.limit) || allCustomer.length;
  let page =
    parseInt(req.query.limit) > allCustomer.length + 1
      ? 1
      : parseInt(req.query.page) || 1;
  const totalPages = Math.ceil(allCustomer.length / limit);
  if (page > totalPages) page = 1;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  let stateGetProduct;
  if (limit === allCustomer.length) {
    stateGetProduct = "all";
  } else {
    stateGetProduct = "";
  }
  const customerService = allCustomer.slice(startIndex, endIndex);
  req.customerService = {
    stateGetProduct,
    currentPage: page,
    totalPages,
    limit,
    customers: customerService,
  };
  next();
};
module.exports = customerServiceMiddleware;
