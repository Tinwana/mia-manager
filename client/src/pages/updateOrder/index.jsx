import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosApi } from "../../axios";
import { Navigate, useParams } from "react-router-dom";

const UpdateOrder = () => {
  const nameRef = useRef()
  const amountRef = useRef()
  const priceRef = useRef()
  const discountRef = useRef()
  const productIdRef = useRef()
  const shippingAddressRef = useRef()
  const phoneNumberRef = useRef()
  const isPaidRef = useRef()
  const isDeliveredRef = useRef()
  const [order, setOrder] = useState([]);
  const [navigate,setNavigate] = useState(false);
  const { orderId } = useParams();
  const getDetailOrder = async (id) => {
    const response = await axiosApi({
      method: "GET",
      url: `orders/detail/${id}`,
    });
    setOrder(response.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosApi({
      method: "PUT",
      url:`orders/update/${orderId}`,
      data:{
        name:nameRef?.current.value,
        amount:amountRef?.current.value,
        price:priceRef?.current.value,
        discount:discountRef?.current.value,
        productId:productIdRef?.current.value,
        shippingAddress:shippingAddressRef?.current.value,
        phoneNumber:phoneNumberRef?.current.value,
        // totalPrice:totalPriceRef?.current.value,
        isPaid:isPaidRef?.current.value,
        isDelivered:isDeliveredRef?.current.value

      },
    })
    setNavigate(true);
  }
  useEffect(() => {
    getDetailOrder(orderId);
  }, []);
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label  className="fw-bold text-uppercase fs-5">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            defaultValue={order?.data?.name}
            name="name"
            ref={nameRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label  className="fw-bold text-uppercase fs-5">Amount</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter amount"
            defaultValue={order?.data?.amount}
            name='amount'
            ref={amountRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicType">
          <Form.Label  className="fw-bold text-uppercase fs-5">Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price"
            defaultValue={order?.data?.price}
            name='price'
            ref={priceRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicWholesale">
          <Form.Label  className="fw-bold text-uppercase fs-5">Discount</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Discount"
            defaultValue={order?.data?.discount}
            name='discount'
            ref={discountRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label  className="fw-bold text-uppercase fs-5">product Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter id"
            defaultValue={order?.data?.productId}
            name='nameProduct'
            ref={productIdRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStock">
          <Form.Label  className="fw-bold text-uppercase fs-5">Shipping Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Shipping Address"
            defaultValue={order?.data?.shippingAddress}
            name='shippingAddress'
            ref={shippingAddressRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDé">
          <Form.Label  className="fw-bold text-uppercase fs-5">PhoneNumber</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter PhoneNumber"
            defaultValue={order?.data?.phoneNumber}
            name='phoneNumber'
            ref={phoneNumberRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDé">
          <Form.Label  className="fw-bold text-uppercase fs-5">IsPaid</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter IsPaid"
            defaultValue={order?.data?.isPaid}
            name='isPaid'
            ref={isPaidRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDé">
          <Form.Label  className="fw-bold text-uppercase fs-5">IsDelivered</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter IsDelivered"
            defaultValue={order?.data?.isDelivered}
            name='isDelivered'
            ref={isDeliveredRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Change
        </Button>
      </Form>
      {navigate && <Navigate to='/order' />}
    </>
  );
};

export default UpdateOrder;
