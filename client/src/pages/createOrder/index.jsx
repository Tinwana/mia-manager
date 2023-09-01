import {  useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosApi } from "../../axios";
import { Navigate, useParams } from "react-router-dom";

const CreateOrderPage = () => {
  const nameRef = useRef()
  const amountRef = useRef()
  const priceRef = useRef()
  const discountRef = useRef()
  const nameProductRef = useRef()
  const shippingAddressRef = useRef()
  const phoneNumberRef = useRef()
  const totalPriceRef = useRef()
  const isPaidRef = useRef()
  const isDeliveredRef = useRef()
  const [navigate,setNavigate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosApi({
      method: "POST",
      url:'orders/create',
      data:{
        name:nameRef?.current.value,
        amount:amountRef?.current.value,
        discount:discountRef?.current.value,
        nameProduct:nameProductRef?.current.value,
        shippingAddress:shippingAddressRef?.current.value,
        phoneNumber:phoneNumberRef?.current.value,
        isPaid:isPaidRef?.current.value,
        isDelivered:isDeliveredRef?.current.value

      },
    })
    setNavigate(true);
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            required='required'
            ref={nameRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter amount"
            name='amount'
            required='required'
            ref={amountRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicWholesale">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Discount"
            defaultValue={0}
            name='discount'
            ref={discountRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Name Product</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name='nameProduct'
            required='required'
            ref={nameProductRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStock">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Shipping Address"
            name='shippingAddress'
            ref={shippingAddressRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDé">
          <Form.Label>PhoneNumber</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter PhoneNumber"
            name='phoneNumber'
            required='required'
            ref={phoneNumberRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDé">
          <Form.Label>IsPaid</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter IsPaid"
            defaultValue={false}
            name='isPaid'
            ref={isPaidRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDé">
          <Form.Label>IsDelivered</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter IsDelivered"
            defaultValue={false}
            name='isDelivered'
            ref={isDeliveredRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
      {navigate && <Navigate to='/order' />}
    </>
  )
}

export default CreateOrderPage