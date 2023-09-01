import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { axiosApi } from "../../axios";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [order, setOrder] = useState([]);

  const getAllOrder = async () => {
    const response = await axiosApi({
      method: "GET",
      url: "orders/get-all",
    });
    setOrder(response.data);
  };

  useEffect(() => {
    getAllOrder();
  }, []);
  console.log(order);
  return (
    <div className="d-flex flex-column gap-5 align-items-center mt-5">
      <Button>
        <Link to="/order/create" className="text-light">
          New order
        </Link>
      </Button>
      <div className="flex-grow-1 w-100">
        <h5>ORDER:</h5>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <td>Name</td>
              <td>Amount</td>
              <td>Price</td>
              <td>Discount</td>
              <td>Name Product</td>
              <td>ShippingAddress</td>
              <td>PhoneNumber</td>
              <td>TotalPrice</td>
              <td>IsPaid</td>
              <td>IsDelivered</td>
              <td>Manager</td>
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
  );
};

export default OrderPage;
