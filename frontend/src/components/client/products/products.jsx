import React, { useEffect } from "react";
import "./laptop.css";
import ProductCard from "../productCard/productCard";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../redux/actions/productAction";
import LoadingBox from "../Effects/LoadingBox";
import MessageBox from "../Effects/MessageBox";

export default function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="desktop-page">
      { loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="desktop-container">
          {products.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      )}
    </div>
  );
}
