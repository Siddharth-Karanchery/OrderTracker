import "./OrderTracker.css";

import Footer from "./modules/Footer/Footer";
import Header from "./modules/Header/Header";
import Home from "./modules/Home/Home";

import { Box, Container } from "@mui/material";
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
    <Box className="OrderTracker">
      <BrowserRouter>
        <Header isNotMobile={isNotMobile} onMenuSelect={onMenuSelect} />
        <Box className="OrderTracker__Page">
          <Routes>
            <Route exact path="/AddOrder" element={<AddOrder />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/insights" element={<Insights />} />
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default OrderTracker;
