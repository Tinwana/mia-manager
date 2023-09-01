import React, { useEffect, useState } from "react";
import { axiosApi } from "../../axios";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const getAllProduct = async () => {
    const response = await axiosApi({
      method: "GET",
      url: "products/get-all",
    });
    setProduct(response.data);
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <div className="d-flex flex-column gap-5 align-items-center mt-5">
      <Button>
        <Link to="/product/create" className="text-light">
          Create new product
        </Link>
      </Button>
      <div className="flex-grow-1 w-100">
        <h5>PRODUCT:</h5>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <td>Name</td>
              <td>Size</td>
              <td>Image</td>
              <td>Type</td>
              <td>Wholesale price</td>
              <td>Price</td>
              <td>Count In Stock</td>
              <td>Description</td>
              <td>Manager</td>
            </tr>
          </thead>
          <tbody>
            {product?.data?.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.image}</td>
                  <td>{item.type}</td>
                  <td>{item.wholesalePrice}</td>
                  <td>{item.price}</td>
                  <td>{item.countInStock}</td>
                  <td>
                    <a href={item.description}>{item.description}</a>
                  </td>
                  <td>
                    <Link to={`/product/update/${item._id}`}>Change</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProductPage;
