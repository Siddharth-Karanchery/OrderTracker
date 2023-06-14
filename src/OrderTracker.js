import "./OrderTracker.css";

import Footer from "./modules/Footer/Footer";
import Header from "./modules/Header/Header";
import Home from "./modules/Home/Home";

import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import AddOrder from "./modules/AddOrder/AddORder";
import Insights from "./modules/Insights/Insights";

function OrderTracker() {
  const [showMenu, setShowMenu] = React.useState(false);

  const isNotMobile = useMediaQuery("(min-width:450px)");

  const onMenuSelect = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="OrderTracker">
      <BrowserRouter>
        <Header isNotMobile={isNotMobile} onMenuSelect={onMenuSelect} />
        <Container className="OrderTracker__Page">
          <Routes>
            <Route exact path="/AddOrder" element={<AddOrder />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/insights" element={<Insights />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default OrderTracker;
