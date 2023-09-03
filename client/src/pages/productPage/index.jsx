import { useEffect, useState, useRef } from "react";
import { axiosApi } from "../../axios";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const filterByRef = useRef();
  const filterValueRef = useRef();
  const [sortProduct, setSortProduct] = useState("");
  const [sortByProduct, setSortByProduct] = useState("");
  const [limitProduct, setLimitProduct] = useState(5);

  const getAllProduct = async () => {
    const response = await axiosApi({
      method: "GET",
      url: `products/get-all?limit=${limitProduct}&sort=${sortProduct}&sort_by=${sortByProduct}`,
    });
    setProduct(response.data);
  };
  const handleProductLimit = (e) => {
    setLimitProduct((pre) => pre + 5);
  };
  const handleSubmitFilter = async (e) => {
    e.preventDefault();
    if (!filterByRef.current?.value || !filterValueRef.current?.value) return;
    const res = await axiosApi({
      method: "GET",
      url: "products/get-all",
      params: {
        filter: filterByRef.current?.value,
        filter_value: filterValueRef.current?.value,
      },
    });
    setFilterProduct(res.data);
  };
  useEffect(() => {
    if (filterValueRef.current?.value !== "") {
      filterValueRef.current.value = "";
      filterValueRef.current?.focus();
      return;
    }
    getAllProduct();
  }, [
    limitProduct,
    filterValueRef?.current?.value,
    sortProduct,
    sortByProduct,
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
                <option value="size">Size</option>
                <option value="type">Type</option>
                <option value="productId">By ID</option>
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
        <Button>
          <Link to="/product/create" className="link-light text-decoration-none">
            Create new product
          </Link>
        </Button>
        <form className="d-flex align-items-center gap-3">
          <div className="d-flex gap-4">
            <span>Sort by: </span>
            <select
              name="filter"
              id="filter"
              onChange={(e) => {
                setSortByProduct(e.target.value);
              }}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="countInStock">Count In Stock</option>
            </select>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span>Type: </span>
            <select
              name="filter"
              id="filter"
              onChange={(e) => {
                setSortProduct(e.target.value);
              }}
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
        </form>
      </div>
      <h5>PRODUCT:</h5>
      <Table bordered hover className="flex-grow-1">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Type</td>
            <td>Size</td>
            <td>Price</td>
            <td>Count In Stock</td>
            <td>Sold in month</td>
            <td>Sold all</td>
            <td>Description</td>
            <td>Manager</td>
          </tr>
        </thead>
        {filterProduct?.data?.products.length !== 0 &&
        filterProduct?.data?.products !== undefined
          ? filterProduct?.data?.products.map((item) => {
              return (
                <>
                  <tbody key={item._id} className="mb-5">
                    <tr>
                      <td>{item.productId}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.size}</td>
                      <td>{item.price}</td>
                      <td>{item.countInStock}</td>
                      <td>{item.soldInMonth}</td>
                      <td>{item.soldAll}</td>
                      <td>
                        <a href={item.description}>{item.description}</a>
                      </td>
                      <td>
                        <Link to={`/product/update/${item._id}`}>Change</Link>
                      </td>
                    </tr>
                  </tbody>
                    <thead>
                    <tr>
                    <td colSpan={2} className="fw-bold">Giá sỉ tại xưởng</td>
                    <td colSpan={2} className="fw-bold">Giá sỉ tại nhà</td>
                    <td colSpan={2} className="fw-bold">Giá lẻ tại xưởng</td>
                    <td colSpan={3} className="fw-bold">Giá lẻ tại nhà</td>
                  </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td colSpan={2}>{item.wholesalePriceChina}</td>
                    <td colSpan={2}>{item.wholesalePrice}</td>
                    <td colSpan={2}>{item.priceChina}</td>
                    <td colSpan={3}>{item.price}</td>
                  </tr>
                    </tbody>
                </>
              );
            })
          : product?.data?.products.map((item) => {
              return (
                <>
                  <tbody key={item._id} className="mb-5">
                    <tr>
                      <td>{item.productId}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.size}</td>
                      <td>{item.price}</td>
                      <td>{item.countInStock}</td>
                      <td>{item.soldInMonth}</td>
                      <td>{item.soldAll}</td>
                      <td className="wrap">
                        <a href={item.description}>{item.description}</a>
                      </td>
                      <td>
                        <Link to={`/product/update/${item._id}`}>Change</Link>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
      </Table>
      <Button onClick={handleProductLimit}>Load more</Button>
    </div>
  );
};

export default ProductPage;
