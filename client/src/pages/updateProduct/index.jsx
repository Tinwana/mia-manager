import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosApi } from "../../axios";
import { Navigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const countInStockRef = useRef();
  const wholesalePriceChinaRef = useRef();
  const wholesalePriceRef = useRef();
  const priceChinaRef = useRef();
  const priceRef = useRef();
  const soldInMonthRef = useRef();
  const descriptionRef = useRef();
  const [product, setProduct] = useState([]);
  const [navigate, setNavigate] = useState(false);
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
      url: `products/update/${productId}`,
      data: {
        countInStock:countInStockRef.current?.value,
        wholesalePriceChina: wholesalePriceChinaRef.current?.value,
        wholesalePrice: wholesalePriceRef.current?.value,
        price: priceRef.current?.value,
        priceChina: priceChinaRef.current?.value,
        soldInMonth: soldInMonthRef.current?.value,
        description: descriptionRef.current?.value,
      },
    });
    setNavigate(true);
  };
  useEffect(() => {
    getAllProduct(productId);
  }, []);
  return (
    <>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicWholesaleChina">
          <Form.Label  className="fw-bold text-uppercase fs-5">Tồn kho:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter countInStock"
            defaultValue={product?.data?.countInStock}
            name="wholesalePriceChina"
            ref={countInStockRef}
          />
        </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicWholesaleChina">
          <Form.Label  className="fw-bold text-uppercase fs-5">Giá xỉ tại xưởng</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price"
            defaultValue={product?.data?.wholesalePriceChina}
            name="wholesalePriceChina"
            ref={wholesalePriceChinaRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicWholesale">
          <Form.Label  className="fw-bold text-uppercase fs-5">Giá sỉ tại nhà</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price"
            defaultValue={product?.data?.wholesalePrice}
            name="wholesalePrice"
            ref={wholesalePriceRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPriceChina">
          <Form.Label  className="fw-bold text-uppercase fs-5">Giá lẻ tại xưởng</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Price"
            defaultValue={product?.data?.priceChina}
            name="priceChina"
            ref={priceChinaRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label  className="fw-bold text-uppercase fs-5">Giá bán</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Price"
            defaultValue={product?.data?.price}
            name="price"
            ref={priceRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSold">
          <Form.Label  className="fw-bold text-uppercase fs-5">Sold In Month</Form.Label>
          <Form.Control
            type="text"
            placeholder="Reset"
            defaultValue={product?.data?.soldInMonth}
            name="soldInMonth"
            ref={soldInMonthRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDé">
          <Form.Label  className="fw-bold text-uppercase fs-5">Description</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Enter Description"
            defaultValue={product?.data?.description}
            name="description"
            ref={descriptionRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Change
        </Button>
      </Form>
      {navigate && <Navigate to="/product" />}
    </>
  );
};

export default UpdateProduct;
