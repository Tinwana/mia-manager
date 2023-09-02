import React, { useRef, useState } from "react";
import { Form,Button } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { axiosApi } from "../../axios";

const CreateProductPage = () => {
  const [navigate,setNavigate] = useState(false);

  const nameRef = useRef()
  const sizeRef = useRef()
  const imageRef = useRef()
  const typeRef = useRef()
  const wholesalePriceRef = useRef()
  const priceRef = useRef()
  const countInStockRef = useRef()
  const descriptionRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosApi({
      method: 'POST',
      url:'products/create',
      data:{
        name:nameRef.current?.value,
        size:sizeRef.current?.value,
        image:imageRef.current?.value,
        type:typeRef.current?.value,
        wholesalePrice:wholesalePriceRef.current?.value,
        price:priceRef.current?.value,
        countInStock:countInStockRef.current?.value,
        description:descriptionRef.current?.value,
      }
    })
    setNavigate(true)
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            required="required"
            ref={nameRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Size</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Size"
            name="size"
            ref={sizeRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter link"
            name="image"
            ref={imageRef}
            required="required"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter type"
            name="type"
            ref={typeRef}
            required="required"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicWholesale">
          <Form.Label>Wholesale price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Wholesale price"
            name="wholesalePrice"
            ref={wholesalePriceRef}
            required="required"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Price"
            name="price"
            ref={priceRef}
            required="required"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStock">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Count In Stock"
            name="countInStock"
            ref={countInStockRef}
            required="required"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDé">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Enter Description"
            name="description"
            ref={descriptionRef}
            required="required"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
      {navigate && <Navigate to="/product" />}
    </>
  );
};

export default CreateProductPage;
