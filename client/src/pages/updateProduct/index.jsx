import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosApi } from "../../axios";
import { Navigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const nameRef = useRef()
  const sizeRef = useRef()
  const imageRef = useRef()
  const typeRef = useRef()
  const wholesalePriceRef = useRef()
  const priceRef = useRef()
  const countInStockRef = useRef()
  const descriptionRef = useRef()
  const [product, setProduct] = useState([]);
  const [navigate,setNavigate] = useState(false);
  const { productId } = useParams();
  const getAllProduct = async (id) => {
    const response = await axiosApi({
      method: "GET",
      url: `products/detail/${id}`,
    });
    setProduct(response.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosApi({
      method: "PUT",
      url:`products/update/${productId}`,
      data:{
        name:nameRef.current?.value,
        size:sizeRef.current?.value,
        image:imageRef.current?.value,
        type:typeRef.current?.value,
        wholesalePrice:wholesalePriceRef.current?.value,
        price:priceRef.current?.value,
        countInStock:countInStockRef.current?.value,
        description:descriptionRef.current?.value,
      },
    })
    setNavigate(true);
  }
  useEffect(() => {
    getAllProduct(productId);
  }, []);
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            defaultValue={product?.data?.name}
            name="name"
            ref={nameRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Size</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Size"
            defaultValue={product?.data?.size}
            name="size"
            ref={sizeRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter link"
            defaultValue={product?.data?.image}
            name='image'
            ref={imageRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter type"
            defaultValue={product?.data?.type}
            name='type'
            ref={typeRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicWholesale">
          <Form.Label>Wholesale price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Wholesale price"
            defaultValue={product?.data?.wholesalePrice}
            name='wholesalePrice'
            ref={wholesalePriceRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Price"
            defaultValue={product?.data?.price}
            name='price'
            ref={priceRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStock">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Count In Stock"
            defaultValue={product?.data?.countInStock}
            name='countInStock'
            ref={countInStockRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDé">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Enter Description"
            defaultValue={product?.data?.description}
            name='description'
            ref={descriptionRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Change
        </Button>
      </Form>
      {navigate && <Navigate to='/product' />}
    </>
  );
};

export default UpdateProduct;
