const Product = require("../models/productModel");
const Order = require("../models/orderModel");

const productServiceMiddleware = async (req, res, next) => {
  if (req.query.sort !== "asc" && req.query.sort !== "desc") {
    req.query.sort = "desc";
  }
  const filterBy = req.query.filter;
  const filterValue = req.query.filter_value || "name";
  let escapeFilterValue;
  const sort = req.query.sort;
  const sortBy = req.query.sort_by || "name";
  let allProduct = await Product.find();

  if (!!sort || !!sortBy) {
    allProduct = await Product.find().sort({ [sortBy]: sort });
  }
  if (!!filterValue && !!filterBy) {
    escapeFilterValue = filterValue.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
    allProduct = await Product.find({
      [filterBy]: { $regex: new RegExp(escapeFilterValue, "i") },
    });
  }
  const limit =
    parseInt(req.query.limit) > allProduct.length + 1
      ? allProduct.length + 1
      : parseInt(req.query.limit) || allProduct.length;
  let page =
    parseInt(req.query.limit) > allProduct.length + 1
      ? 1
      : parseInt(req.query.page) || 1;
  const totalPages = Math.ceil(allProduct.length / limit);
  if (page > totalPages) page = 1;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  let stateGetProduct;
  if (limit === allProduct.length) {
    stateGetProduct = "all";
  } else {
    stateGetProduct = "";
  }
  const productService = allProduct.slice(startIndex, endIndex);
  req.productService = {
    stateGetProduct,
    currentPage: page,
    totalPages,
    limit,
    products: productService,
  };
  next();
};
module.exports = productServiceMiddleware;
