import  { useEffect, useRef, useState } from 'react'
import { axiosApi } from '../../axios';
import { Button, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomerPage = () => {
  const [customer, setCustomer] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState([]);
  const [limitCustomer, setLimitCustomer] = useState(5);
  const filterByRef = useRef();
  const filterValueRef = useRef();

  const getAllCustomer = async () => {
    const response = await axiosApi({
      method: "GET",
      url: `customers/get-all?limit=${limitCustomer}`,
    });
    setCustomer(response.data);
  };
  const handleCustomerLimit = (e) => {
    setLimitCustomer((pre) => pre + 5);
  };
  const handleSubmitFilter = async (e) => {
    e.preventDefault();
    if (!filterByRef.current?.value || !filterValueRef.current?.value) return;
    const res = await axiosApi({
      method: "GET",
      url: "customers/get-all",
      params: {
        filter: filterByRef.current?.value,
        filter_value: filterValueRef.current?.value,
      },
    });
    setFilterCustomer(res.data);
  };
  useEffect(() => {
    if (filterValueRef.current?.value !== "") {
      filterValueRef.current.value = "";
      filterValueRef.current?.focus();
      return;
    }
    getAllCustomer();
  }, [
    limitCustomer,
    filterValueRef?.current?.value,
  ]);
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
                <option value="phone">Phone</option>
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
      </div>
      <h5>CUSTOMER:</h5>
      <Table bordered hover className="flex-grow-1">
        <thead>
          <tr>
            <td>Name</td>
            <td>Phone</td>
            <td>Address</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {filterCustomer?.data?.customers.length !== 0 &&
          filterCustomer?.data?.customers !== undefined
            ? filterCustomer?.data?.customers.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.description}</td>
                    <td>
                      <Link to={`/customer/update/${item._id}`}>Change</Link>
                    </td>
                  </tr>
                );
              })
            : customer?.data?.customers.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.description}</td>
                    <td>
                      <Link to={`/customer/update/${item._id}`}>Change</Link>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
      <Button onClick={handleCustomerLimit}>Load more</Button>
    </div>
  )
}

export default CustomerPage