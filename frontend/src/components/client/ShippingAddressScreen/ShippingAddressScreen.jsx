import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../../redux/actions/cartActions";
import CheckoutStep from "../CheckoutSteps/CheckoutSteps";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector(state=> state.userSignin);
  const {userInfo} = userSignin;
  if(!userInfo){
    props.history.push('/signin');
  }
  const cart = useSelector(state=>state.cart);
  const {shippingAddress} = cart; 

  const [fullName, setfullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState( shippingAddress.city);
  const [postalCode, setpostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push('/payment')
  };
  return (
    <div className="card">
      <CheckoutStep step1 step2></CheckoutStep>
      <form onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div className="card">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your fullName"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            required
          />
        </div>
        <div className="card">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="card">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="card">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter your postalCode"
            value={postalCode}
            onChange={(e) => setpostalCode(e.target.value)}
            required
          />
        </div>
        <div className="card">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
}
