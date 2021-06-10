import "./App.css";

// import ProdcutManger from './components/admin/productManager/productManger';
import NavBar from "./components/client/navBar/navBar";
import Header from "./components/client/header/header";
import Footer from "./components/client/footer/footer";
import Home from "./components/client/home/home";

// Router improts
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./components/client/products/products";
import ProductScreen from "./components/client/productScreen/productScreen";
import CartScreen from "./components/client/CartScreen/CartScreen";
import SignInScreen from "./components/client/SignInScreen/SignInScreen";
import RegisterScreen from "./components/client/RegisterScreen/RegisterScreen";
import ShippingAddressScreen from "./components/client/ShippingAddressScreen/ShippingAddressScreen";
import PaymentMethodScreen from "./components/client/PaymentMethodScreen/PaymentMethodScreen";
import PlaceOrderScreen from "./components/client/PlaceOrderScreen/PlaceOrderScreen";

// importing provider form react-redux
import { Provider } from "react-redux";
import store from "./redux/store";
import OrderScreen from "./components/client/OrderScreen/OrderScreen";
import ContactusScreen from "./components/client/ContactusScreen/ContactusScreen";
import About from "./components/client/About/About";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="head">
            <Header />
            <NavBar />
          </div>

          <div className="body">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/products" exact component={Products} />
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/signin" component={SignInScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/shipping" component={ShippingAddressScreen} />
              <Route path="/payment" component={PaymentMethodScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/order/:id" component={OrderScreen} />
              <Route path="/contactus" component={ContactusScreen} />
              <Route path="/about" component={About} />
            </Switch>
          </div>

          <div className="footer">
            <Footer />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
