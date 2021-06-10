import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../../../redux/actions/orderAction";
import { ORDER_CREATE_RESET } from "../../../redux/constants/orderConstants";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";

import LoadingBox from '../Effects/LoadingBox';
import MessageBox from '../Effects/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.18 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div className="card">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div>
        <div class="Adrress card">
          <h1>Shipping</h1>
          <h1>Name:</h1> {cart.shippingAddress.fullName}
          <h1>Address:</h1> {cart.shippingAddress.address},{" "}
          {cart.shippingAddress.city},{cart.shippingAddress.postalCode},{" "}
          {cart.shippingAddress.country}
        </div>
        <div class="PaymentDetail card">
          <h1>Payment</h1>
          <h1>Method: {cart.paymentMethod}</h1>
        </div>
        <div class="OrderDetail card">
          <h1>Order Items</h1>

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
                  <div>${item.price}</div>
                </div>
              </li>
            ))} 
          </ul>
        </div>
        <div class="ordersummary card">
          <h1>Order Summary</h1>
          <h3>Items: ${cart.itemsPrice.toFixed(2)}</h3>
          <h3>Shipping: ${cart.shippingPrice.toFixed(2)}</h3>
          <h3>Tax(GST 18%): ${cart.taxPrice.toFixed(2)}</h3>
          <h1>Order Total: ${cart.totalPrice.toFixed(2)}</h1>
        </div>
        <div>
          <button type="submit" onClick={placeOrderHandler}>
            Place Order
          </button>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
      </div>
    </div>
  );
}
