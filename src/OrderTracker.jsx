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
import Login from "./modules/Login/Login";
import RouteGuard from "./modules/RouteGuard/RouteGuard";

function OrderTracker() {
  const [showMenu, setShowMenu] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState();

  const isNotMobile = useMediaQuery("(min-width:450px)");

  const onMenuSelect = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <Box className="OrderTracker">
      <BrowserRouter>
        <Header
          isNotMobile={isNotMobile}
          onMenuSelect={onMenuSelect}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
        <Box className="OrderTracker__Page">
          <Routes>
            <Route
              exact
              path="/AddOrder"
              element={
                <RouteGuard
                  userDetails={userDetails}
                  component={<AddOrder />}
                />
              }
            />

            <Route
              exact
              path="/"
              element={
                <RouteGuard userDetails={userDetails} component={<Home />} />
              }
            />
            <Route
              exact
              path="/insights"
              element={
                <RouteGuard
                  userDetails={userDetails}
                  component={<Insights />}
                />
              }
            />
            <Route
              exact
              path="/login"
              element={<Login setUserDetails={setUserDetails} />}
            />
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default OrderTracker;
