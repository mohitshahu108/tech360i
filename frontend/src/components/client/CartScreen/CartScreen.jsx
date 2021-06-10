import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartScreen.css";
import { addToCart, removeFromCart } from "../../../redux/actions/cartActions";

import MessageBox from "../Effects/MessageBox";

import { Link } from "react-router-dom";

export default function CartScreen(props) {
  const productID = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  const removeFromCartHandler = (id) => {
    //delete action
    dispatch(removeFromCart(id))
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div>
      <div className="center">
        <h1>Shopping Cart</h1>
      </div>
      <div className="cart-page">
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/"> Go Shopping </Link>
          </MessageBox>
        ) : (
          <div className="carItems">
            <ul>
              {cartItems.map((item) => (
                <li key={cartItems.product} className="cartItem">
                  <div className="flexcontainer">
                    <div>
                      <img src={item.image} alt={item.name} className="small" />
                    </div>
                    <div>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div>${item.price}</div>
                    <div>
                      <button type="button" onClick={() => removeFromCartHandler(item.product)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="balencesheet">
          
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <button
              type="button"
              onClick={checkoutHandler}
              className="button"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
