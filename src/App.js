import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Body
import Footer from "./Components/Body/Footer";
import Navbar from "./Components/Body/Header/Navbar.jsx";
import Sidebar from "./Components/Body/sidebar/Sidebar";
// Components
import Homepage from "./Components/Main/Homepage";
import ShopNow from "./Components/Main/ShopNow/ShopNow";
import ProductDescription from "./Components/Main/ProductDescription";
import Cart from "./Components/Main/Cart";
import ItemForm from "./Components/Forms/ItemForm";
import Login from "./Components/Auth/Login";
import Blog from "./Components/Blogs/Blog";
import PrivacyPolicy from "./Components/Main/Policies/PrivacyPolicy";
import ContactUs from "./Components/Main/Policies/ContactUs";
import ReturnExchangePolicy from "./Components/Main/Policies/ReturnExchangePolicy";
import RefundReturnPolicy from "./Components/Main/Policies/RefundReturnPolicy";
import ShippingPolicy from "./Components/Main/Policies/ShippingPolicy";
import SuccessPage from "./Components/SucessPages/SuccessPage";

import PayFastGateway from "./Components/Forms/PayFastGateway";
import SearchPage from "./Components/Search/SearchPage";
import ErrorPage from "./Components/ErrorPages/ErrorPage";
import Events from "./Components/EventSection/Events.jsx";

function App() {
  return (
    <div>
      {/* <Sidebar /> */}
      <div id="wrapper">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/Shop-now/:id" element={<ShopNow />} />
            <Route
              path="/Product-description/:id"
              element={<ProductDescription />}
            />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Checkout" element={<ItemForm />} />
            <Route path="/SuccessPage" element={<SuccessPage />} />
            <Route path="/SearchPage" element={<SearchPage />} />
            <Route path="/Events/:id" element={<Events />} />

            <Route path="/Blog" element={<Blog />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route
              path="/ReturnExchangePolicy"
              element={<ReturnExchangePolicy />}
            />
            <Route
              path="/RefundReturnPolicy"
              element={<RefundReturnPolicy />}
            />
            <Route path="/ShippingPolicy" element={<ShippingPolicy / >} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/Error50" element={<ErrorPage />} />
            
          </Routes>
        </Router>
        <Footer />
+
        {/* <PayFastGateway /> */}
      </div>
    </div>
  );
}

export default App;
