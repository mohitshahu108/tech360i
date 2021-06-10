import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.increament = this.increament.bind(this);
    this.decreament = this.decreament.bind(this);

    this.state = {
      imgLinks: [
        "https://rukminim1.flixcart.com/image/312/312/keaaavk0/computer/x/m/y/lenovo-na-laptop-original-imafuzt8r5jqppfn.jpeg?q=70",
        "https://rukminim1.flixcart.com/image/312/312/kctf0cw0/computer/z/z/6/hp-na-thin-and-light-laptop-original-imaftv7fhbftxnmq.jpeg?q=70",
        "https://rukminim1.flixcart.com/image/312/312/kcm9t3k0/computer/q/x/r/hp-na-gaming-laptop-original-imaftpesbvfxgw9t.jpeg?q=70",
        "https://rukminim1.flixcart.com/image/312/312/kebpqq80/computer/w/c/g/lenovo-na-thin-and-light-laptop-original-imafvyqvwmhtpwqh.jpeg?q=70",
        "https://rukminim1.flixcart.com/image/312/312/kcp4osw0/computer/t/f/z/asus-na-original-imaftrgwna6snfn8.jpeg?q=70",
      ],
      positionCount: 0,
    };
  }

  increament() {
    if (this.state.positionCount === 4) {
      this.setState({
        positionCount: 0,
      });
    }
    this.setState((state) => ({
      positionCount: state.positionCount + 1,
    }));
  }

  decreament() {
    if (this.state.positionCount === 0) {
      this.setState({
        positionCount: 5,
      });
    }
    this.setState((state) => ({
      positionCount: state.positionCount - 1,
    }));
  }
  componentDidMount() {
    setInterval(() => {
      this.increament();
    }, 3000);
  }
  render() {
    return (
      <div className="home">
        <div className="slide-show-container">
          <img
            className="img"
            src={this.state.imgLinks[this.state.positionCount]}
            alt=""
          />
          <div className="prev" onClick={this.decreament}>
            &#10094;
          </div>
          <div className="next" onClick={this.increament}>
            &#10095;
          </div>
        </div>
        <div className="products-container">
          <div className="lappi">
            <div className="lappi-img">
              <img
                src="https://rukminim1.flixcart.com/image/312/312/kl9rssw0/computer/g/i/e/lenovo-original-imagyfw5fkyjrhmb.jpeg?q=70"
                alt=""
              />
            </div>
            <div className="about-lappi">
              <h3 className="lappi-name">
                Lenovo Ideapad Flex 5 core i3 11th Gen
              </h3>
              <div className="lappi-specification">
                <ul>
                  <li>Intel Core i3 Processor (11th Gen)</li>
                  <li>8 GB DDR4 RAM</li>
                  <li>64 bit Windows 10 Operting System</li>
                  <li>Microsoft Office Home and Student 2019</li>
                  <li>1 Year Onsite Warraty</li>
                </ul>
              </div>
              <div className="lappi-price"></div>
            </div>
            <Link to={"/products"}>
              <button> Show More</button>
            </Link>
          </div>
          <div className="desktop">
            <div className="desktop-img">
              <img
                src="https://rukminim1.flixcart.com/image/612/612/ke7ff680/allinone-desktop/d/z/8/hp-22-dd0201in-original-imafuxv3fuhxnc6u.jpeg?q=70"
                alt=""
              />
            </div>
            <div className="about-desktop">
              <h3 className="desktop-name">HP All in One PC</h3>
              <div className="desktop-specification">
                <ul>
                  <li>Intel Core i3 Processor (11th Gen)</li>
                  <li>8 GB DDR4 RAM</li>
                  <li>64 bit Windows 10 Operting System</li>
                  <li>Microsoft Office Home and Student 2019</li>
                  <li>1 Year Onsite Warraty</li>
                </ul>
              </div>
            </div>
            <Link to={"/products"}>
              <button> Show More</button>
            </Link>
            <div className="desktop-price"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
