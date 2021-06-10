import React from "react";
import {Link} from 'react-router-dom';


const ProductCard = (props) => {
    const {product} = props;
  return (
    <div className="product-card" >
      <div className="product-img">
       <Link to={`/product/${product._id}`}><img src={product.ImageURL} alt="" /></Link> 
      </div>
      <div className="about-product">
      <Link to={`/product/${product._id}`}> <h1 className="product-name">
          {product.Brand} {product.Model}
        </h1></Link>
        <div className="product-specification">
          <ul>
            <li>{product.Processor}</li>
            <li>{product.RAM} DDR4 RAM</li>
            <li>64 bit Windows 10 Operting System</li>
            <li>Microsoft Office Home and Student 2019</li>
            <li>{product.Graphics_Processor}</li>
            <li>1 Year Onsite Warraty</li>
          </ul>
        </div>
      </div>
      <div className="product-price">{product.Price}</div>
      <div></div>
    </div>
  );
};

export default ProductCard;

