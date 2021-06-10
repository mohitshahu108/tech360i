import React, { useEffect, useState } from "react";
import "./productScreen.css";
//import data from "../../../data";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../Effects/LoadingBox";
import MessageBox from "../Effects/MessageBox";
import { detailsProduct } from "../../../redux/actions/productAction";
import { Link } from "react-router-dom";

export default function ProductScreen(props) {
  //const product = data.products.find((x) => x._id === props.match.params.id);
  const dispatch = useDispatch();
  const productID = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [qty, setqty] = useState(1);
  useEffect(() => {
    dispatch(detailsProduct(productID));
  }, [dispatch, productID]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productID}?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="product-container">
          <div className="product-img">
            <img src={product.ImageURL} alt="" />
          </div>
          <div className="product-info">
            <ul>
              <li className="brand-name">
                {product.Brand}
                {product.Model}
              </li>
              <li>{product.Processor}</li>
              <li>{product.Category}</li>
              <li>{product.RAM}</li>
              <li>{product.Graphics_Processor}</li>
              <li>{product.Storage}</li>
              <li>{product.Bluetooth}</li>
              <li>{product.WebCamera}</li>
              <li>{product.Wi_Fi}</li>
              <li>{product.Battery_cell}</li>
              <li>{product.Battery_life}</li>
              <li>${product.Price}</li>
            </ul>
          </div>
          <div className="quantity">
            <div>Quantity:  </div>
            <select value={qty} onChange={(e) => setqty(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="btn-grp">
            <button onClick={addToCartHandler}>Add to Cart</button>
            <Link to={`/cart/${productID}?qty=${qty}`}></Link>
          </div>
        </div>
      )}
    </div>
  );
}
