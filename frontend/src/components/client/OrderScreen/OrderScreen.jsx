import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, payOrder } from "../../../redux/actions/orderAction";

import LoadingBox from "../Effects/LoadingBox";
import MessageBox from "../Effects/MessageBox";
import { PayPalButton } from "react-paypal-button-v2";


export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
  } = orderPay;

  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get('/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order) {
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="card">
      <h1>Order {order._id}</h1>
      <div>
        <div class="Adrress card">
          <h1>Shipping</h1>
          <h1>Name:</h1> {order.shippingAddress.fullName}
          <h1>Address:</h1> {order.shippingAddress.address},{" "}
          {order.shippingAddress.city},{order.shippingAddress.postalCode},{" "}
          {order.shippingAddress.country}
          <h1>DeliveryStatus:</h1>
          <p>
            {" "}
            {order.isDelivered ? (
              <MessageBox variant="success">
                Delivered at {order.deliveredAt}
              </MessageBox>
            ) : (
              <MessageBox variant="danger">Not Delivered</MessageBox>
            )}
          </p>
        </div>
        <div class="PaymentDetail card">
          <h1>Payment</h1>
          <h1>Method:</h1> {order.paymentMethod}
          <h1>PaymentStatus:</h1>
          {order.isPaid ? (
            <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
          ) : (
            <MessageBox variant="danger">Not Paid</MessageBox>
          )}
        </div>
        <div class="OrderDetail card">
          <h1>Order Items</h1>

          <ul>
            {order.orderItems.map((item) => (
              <li key={item.product} className="cartItem">
                <div className="flexcontainer">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>${item.price}</div>
                </div>
                <div>
                  {item.qty} x ${item.price} = ${item.qty * item.price}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div class="ordersummary card">
          <h1>Order Summary</h1>
          <h3>Items: ${order.itemsPrice.toFixed(2)}</h3>
          <h3>Shipping: ${order.shippingPrice.toFixed(2)}</h3>
          <h3>Tax(GST 18%): ${order.taxPrice.toFixed(2)}</h3>
          <h1>Order Total: ${order.totalPrice.toFixed(2)}</h1>
          {!order.isPaid && (
            <li>
               {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
            </li>
          )}
        </div>
      </div>
    </div>
  );
}
