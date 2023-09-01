import classNames from "classnames/bind";
import styles from "./homepage.module.scss";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";

import { axiosApi } from "../../axios";
import { BASE_URL } from "../../config/env";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const HomePage = () => {
  const [product, setProduct] = useState([]);
  // const [customer, setCustomer] = useState([]);
  const [order, setOrder] = useState([]);

  const getAllProduct = async () => {
    const response = await axiosApi({
      method: "GET",
      url: "products/get-all",
    });
    setProduct(response.data);
  };
  const getAllOrder = async () => {
    const response = await axiosApi({
      method: "GET",
      url: "orders/get-all",
    });
    setOrder(response.data);
  };

  useEffect(() => {
    getAllProduct();
    getAllOrder();
  }, []);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("block")}>
          <h5>PRODUCT:</h5>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <td>Name</td>
                <td>Size</td>
                <td>Image</td>
                <td>Type</td>
                <td>Wholesale price</td>
                <td>Price</td>
                <td>Count In Stock</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              {product?.data?.map((item) => {
                return (
                  <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.image}</td>
                  <td>{item.type}</td>
                  <td>{item.wholesalePrice}</td>
                  <td>{item.price}</td>
                  <td>{item.countInStock}</td>
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
        </div>
        <div className={cx("block")}>
          <h5>ORDER:</h5>
          <Table bordered hover responsive>
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
            {order?.data?.map((item) => {
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
        </div>
      </div>
    </>
  );
};

export default HomePage;
