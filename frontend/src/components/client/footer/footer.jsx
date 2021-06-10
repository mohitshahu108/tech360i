import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

class Footer extends Component {
    
    render() { 
        return ( 
            <div className="footer">
                <ul className="footer">
                   <Link to="about"><li>About Us</li></Link> 
                   <Link to="contactus"><li>Contact</li></Link> 
                    <p>CopyRight @ Teach360i.com</p>
                </ul>
            </div>
         );
    }
}
 
export default Footer;