import classNames from "classnames/bind";
import styles from "./homepage.module.scss";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

import { axiosApi } from "../../axios";
import { BASE_URL } from "../../config/env";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const HomePage = () => {
  const [limitProduct,setLimitProduct] = useState(5)
  const [limitOrder,setLimitOrder] = useState(5)
  const [product, setProduct] = useState([]);
  // const [customer, setCustomer] = useState([]);
  const [order, setOrder] = useState([]);

  const getAllProduct = async () => {
    const response = await axiosApi({
      method: "GET",
      url: `products/get-all?limit=${limitProduct}`,
    });
    setProduct(response.data);
  };
  const getAllOrder = async () => {
    const response = await axiosApi({
      method: "GET",
      url: `orders/get-all?limit=${limitOrder}`,
    });
    setOrder(response.data);
  };

  const handleProductLimit = e => {
    setLimitProduct(pre => pre + 5)
  }

  const handleOrderLimit = e => {
    setLimitOrder(pre => pre + 5)
  }

  useEffect(() => {
    getAllProduct();
    getAllOrder();
  }, [limitProduct,limitOrder]);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("block")}>
          <h5>PRODUCT:</h5>
          <Table bordered hover className="flex-grow-1">
            <thead>
              <tr>
                <td>Name</td>
                <td>Size</td>
                <td>Image</td>
                <td>Type</td>
                <td>Wholesale price</td>
                <td>Price</td>
                <td>Count In Stock</td>
                <td>Sold in month</td>
                <td>Sold all</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              {product?.data?.products?.map((item) => {
                return (
                  <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.image}</td>
                  <td>{item.type}</td>
                  <td>{item.wholesalePrice}</td>
                  <td>{item.price}</td>
                  <td>{item.countInStock}</td>
                  <td>{item.soldInMonth}</td>
                  <td>{item.soldAll}</td>
                  <td>
                    <a href={item.description}>{item.description}</a>
                  </td>
                  <td>
                    <Link to={`/product/update/${item._id}`}>Change</Link>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </Table>
          <Button onClick={handleProductLimit}>Load more</Button>
        </div>
        <div className={cx("block")}>
          <h5>ORDER:</h5>
          <Table bordered hover className="flex-grow-1">
            <thead>
              <tr>
                <td>Name</td>
                <td>Size</td>
                <td>Amount</td>
                <td>Price</td>
                <td>Discount</td>
                <td>Product Name</td>
                <td>ShippingAddress</td>
                <td>PhoneNumber</td>
                <td>TotalPrice</td>
                <td>IsPaid</td>
                <td>IsDelivered</td>
              </tr>
            </thead>
            <tbody>
            {order?.data?.orders?.map((item) => {
              const totalPrice =
                item.price * item.amount -
                (item.discount / 100) * item.price * item.amount;
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.amount}</td>
                  <td>{item.price}</td>
                  <td>{item.discount}</td>
                  <td>{item.nameProduct}</td>
                  <td>{item.shippingAddress}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{totalPrice}</td>
                  {item.isPaid === false ? (
                    <td>Not paid yet!</td>
                  ) : (
                    <td>Paid</td>
                  )}
                  {item.isDelivered === false ? (
                    <td>Not delivery yet!</td>
                  ) : (
                    <td>delivery successfully</td>
                  )}
                  <td>
                    <Link to={`/order/update/${item._id}`}>Change</Link>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </Table>
          <Button onClick={handleOrderLimit}>Load more</Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
