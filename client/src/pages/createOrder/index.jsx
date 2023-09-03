import {  useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosApi } from "../../axios";
import { Navigate } from "react-router-dom";

const CreateOrderPage = () => {
  const nameRef = useRef()
  const sizeRef = useRef()
  const amountRef = useRef()
  const discountRef = useRef()
  const productIdRef = useRef()
  const shippingAddressRef = useRef()
  const phoneNumberRef = useRef()
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
        size:sizeRef?.current.value,
        productId:productIdRef?.current.value,
        amount:amountRef?.current.value,
        discount:discountRef?.current.value,
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
      <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label  className="fw-bold text-uppercase fs-5">Số điện thoại:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter PhoneNumber"
            name='phoneNumber'
            required='required'
            ref={phoneNumberRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label  className="fw-bold text-uppercase fs-5">Tên khách:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            required='required'
            ref={nameRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label  className="fw-bold text-uppercase fs-5">Nhập mã sản phẩm:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập mã sản phẩm"
            name='productId'
            required='required'
            ref={productIdRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSize">
          <Form.Label  className="fw-bold text-uppercase fs-5">Nhập kích thước:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập kích thước"
            name='size'
            required='required'
            ref={sizeRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAmount">
          <Form.Label  className="fw-bold text-uppercase fs-5">Số lượng</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter amount"
            name='amount'
            required='required'
            ref={amountRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDiscount">
          <Form.Label  className="fw-bold text-uppercase fs-5">Giảm giá</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Discount"
            defaultValue={0}
            name='discount'
            ref={discountRef}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicShip">
          <Form.Label  className="fw-bold text-uppercase fs-5">Địa chỉ gia hàng</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Shipping Address"
            name='shippingAddress'
            ref={shippingAddressRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPaid">
          <Form.Label  className="fw-bold text-uppercase fs-5">Trạng thái thanh toán</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter IsPaid"
            defaultValue={false}
            name='isPaid'
            ref={isPaidRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDelivery">
          <Form.Label  className="fw-bold text-uppercase fs-5">trạng thái giao hàng</Form.Label>
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