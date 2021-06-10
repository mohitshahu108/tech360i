import React, { Component } from "react";
import "./productManger.css";

class ProductManager extends Component {
  state = {};
  render() {
    return (
      <div className="ProductManager">
        <div className="filter"></div>
        <div className="workSpace">
          <div className="adminOption">
            <button>Available Product</button>
            <button>Add Product</button>
            <button>Remove Product</button>
            <button>Edit Product</button>
          </div>
          <div className="productViewer">
            <div className="productCard">
              <div className="productImg"> <img src="https://rukminim1.flixcart.com/image/312/312/kmf7ki80/computer/x/e/7/na-thin-and-light-laptop-hp-original-imagfbnmrxatzhc6.jpeg?q=70" alt=""/></div>
              <div className="productSpecification">
                  <h3>Name akalnflkds dskjds sjdjsk sjsjds sakjklajksd sjdhkjsjds  sjsjs</h3>
                  <ul>
                      <li>productSpecification 1</li>
                      <li>productSpecification 2</li>
                      <li>productSpecification 3</li>
                      <li>productSpecification 4</li>
                      <li>productSpecification 5</li>
                  </ul>
              </div>
              <div className="productPrice"> 11,500 Rs/- </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductManager;
