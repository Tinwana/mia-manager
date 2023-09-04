import React, { useRef, useState } from "react";
import { Form,Button } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { axiosApi } from "../../axios";

const CreateProductPage = () => {
  const [navigate,setNavigate] = useState(false);

  const nameRef = useRef()
  const productIdRef = useRef()
  const sizeRef = useRef()
  const typeRef = useRef()
  const wholesalePriceChinaRef = useRef()
  const wholesalePriceRef = useRef()
  const priceChinaRef = useRef()
  const priceRef = useRef()
  const countInStockRef = useRef()
  const descriptionRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosApi({
      method: 'POST',
      url:'products/create',
      data:{
        productId:productIdRef.current?.value,
        name:nameRef.current?.value,
        size:sizeRef.current?.value,
        type:typeRef.current?.value,
        wholesalePriceChina:wholesalePriceChinaRef.current?.value,
        wholesalePrice:wholesalePriceRef.current?.value,
        priceChina:priceChinaRef.current?.value,
        price:priceRef.current?.value,
        countInStock:countInStockRef.current?.value,
        description:descriptionRef.current?.value,
      }
    })
    setNavigate(true)
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className="d-flex justify-content-between">
        <div className="flex-grow-1">
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="fw-bold text-uppercase fs-5">Mã sản phẩm:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập mã sản phẩm"
              name="name"
              required="required"
              ref={productIdRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="fw-bold text-uppercase fs-5">Tên sản phẩm:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên sản phẩm"
              name="name"
              required="required"
              ref={nameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="fw-bold text-uppercase fs-5">Size:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Size"
              required="required"
              name="size"
              ref={sizeRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicType">
            <Form.Label className="fw-bold text-uppercase fs-5">Loại đồ:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập loại đồ"
              name="type"
              ref={typeRef}
              required="required"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicWholesaleChina">
            <Form.Label className="fw-bold text-uppercase fs-5">Giá sỉ tại xưởng:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập giá sỉ tại xưởng"
              name="wholesalePriceChina"
              ref={wholesalePriceChinaRef}
              required="required"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicWholesale">
            <Form.Label className="fw-bold text-uppercase fs-5">Giá sỉ tại nhà:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập giá sỉ tại nhà"
              name="wholesalePrice"
              ref={wholesalePriceRef}
              required="required"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPriceChina">
            <Form.Label className="fw-bold text-uppercase fs-5">Giá lẻ tại xưởng:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập giá lẻ tại xưởng"
              name="priceChina"
              ref={priceChinaRef}
              required="required"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label className="fw-bold text-uppercase fs-5">Giá bán:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              name="price"
              ref={priceRef}
              required="required"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStock">
            <Form.Label className="fw-bold text-uppercase fs-5">Tồn kho:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Count In Stock"
              name="countInStock"
              ref={countInStockRef}
              required="required"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDé">
            <Form.Label className="fw-bold text-uppercase fs-5">Description:</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter Description"
              name="description"
              ref={descriptionRef}
            />
          </Form.Group>
        </div>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
      {navigate && <Navigate to="/product" />}
    </>
  );
};

export default CreateProductPage;
