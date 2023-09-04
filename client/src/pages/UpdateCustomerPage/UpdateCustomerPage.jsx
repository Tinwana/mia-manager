import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosApi } from "../../axios";
import { Navigate, useParams } from "react-router-dom";

const UpdateCustomerPage = () => {
  const nameRef = useRef()
  const phoneRef = useRef()
  const addressRef = useRef()
  const desRef = useRef()
  const [customer, setCustomer] = useState([]);
  const [navigate,setNavigate] = useState(false);
  const { customerId } = useParams();
  const getDetailCustomer = async (id) => {
    const response = await axiosApi({
      method: "GET",
      url: `customers/detail/${id}`,
    });
    setCustomer(response.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosApi({
      method: "PUT",
      url:`customers/update/${customerId}`,
      data:{
        name:nameRef?.current.value,
        phone:phoneRef?.current.value,
        address:addressRef?.current.value,
        description:desRef?.current.value,
      },
    })
    setNavigate(true);
  }
  useEffect(() => {
    getDetailCustomer(customerId);
  }, []);
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label  className="fw-bold text-uppercase fs-5">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            defaultValue={customer?.data?.name}
            name="name"
            ref={nameRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label  className="fw-bold text-uppercase fs-5">Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone"
            defaultValue={customer?.data?.phone}
            name="phone"
            ref={phoneRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label  className="fw-bold text-uppercase fs-5">Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            defaultValue={customer?.data?.address}
            name="phone"
            ref={addressRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDes">
          <Form.Label  className="fw-bold text-uppercase fs-5">Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            defaultValue={customer?.data?.description}
            name="phone"
            ref={desRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Change
        </Button>
      </Form>
      {navigate && <Navigate to='/customer' />}
    </>
  );
};

export default UpdateCustomerPage;
