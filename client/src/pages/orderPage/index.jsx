import { useEffect, useRef, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { axiosApi } from "../../axios";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [order, setOrder] = useState([]);
  const [limitOrder, setLimitOrder] = useState(5);
  const [filterOrder, setFilterOrder] = useState([]);
  const filterByRef = useRef();
  const filterValueRef = useRef();

  const getAllOrder = async () => {
    const response = await axiosApi({
      method: "GET",
      url: `orders/get-all?limit=${limitOrder}`,
    });
    setOrder(response.data);
  };
  const handleOrderLimit = (e) => {
    setLimitOrder((pre) => pre + 5);
  };

  const handleSubmitFilter = async (e) => {
    e.preventDefault();
    if (!filterByRef.current?.value || !filterValueRef.current?.value) return;

    const res = await axiosApi({
      method: "GET",
      url: "orders/get-all",
      params: {
        filter: filterByRef.current?.value,
        filter_value: filterValueRef.current?.value,
      },
    });
    setFilterOrder(res.data);
  };

  useEffect(() => {
    if (filterValueRef.current?.value !== "") {
      filterValueRef.current.value = "";
      filterValueRef.current?.focus();
      return;
    }
    getAllOrder();
  }, [limitOrder, filterValueRef?.current?.value]);
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <div className="w-100 d-flex justify-content-between align-items-center px-3">
        <form
          onSubmit={handleSubmitFilter}
          className="d-flex align-items-center gap-3"
        >
          <div className="d-flex flex-column gap-4">
            <div className="d-flex gap-4">
              <span>Search by: </span>
              <select ref={filterByRef} name="filter" id="filter">
                <option value="name">Name</option>
                <option value="shippingAddress">Shipping Address</option>
                <option value="phoneNumber">Phone Number</option>
              </select>
            </div>
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="filterValue">Search value: </label>
              <Form.Control
                id="filterValue"
                type="text"
                name="filter_value"
                ref={filterValueRef}
              />
              <Button type="submit">Search</Button>
            </div>
          </div>
        </form>
        <Button>
          <Link to="/order/create" className="text-light">
            New order
          </Link>
        </Button>
      </div>
      <h5>ORDER:</h5>
      <Table bordered hover className="flex-grow-1">
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
          {filterOrder?.data?.orders.length !== 0 &&
          filterOrder?.data?.orders !== undefined
            ? filterOrder?.data?.orders.map((item) => {
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
              })
            : order?.data?.orders.map((item) => {
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
      <Button onClick={handleOrderLimit}>Load more</Button>
    </div>
  );
};

export default OrderPage;
