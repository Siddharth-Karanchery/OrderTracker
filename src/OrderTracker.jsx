import "./OrderTracker.css";

import Footer from "./modules/Footer/Footer";

import Home from "./modules/Home/Home";

import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from "react";
import AddOrder from "./modules/AddOrder/AddORder";
import Dashboard from "./modules/Dashboard/Dashboard";
import Insights from "./modules/Insights/Insights";
import Login from "./modules/Login/Login";
import RouteGuard from "./modules/RouteGuard/RouteGuard";
import NoMatch from "./modules/NoMatch/NoMatch";

function OrderTracker() {
  const [userDetails, setUserDetails] = React.useState();

  return (
    <Box className="OrderTracker">
      <BrowserRouter>
        <Box className="OrderTracker__Page">
          <Routes>
            <Route
              exact
              path="/home"
              element={
                <RouteGuard userDetails={userDetails} component={<Home />} />
              }
            >
              <Route
                path=""
                element={<Dashboard userDetails={userDetails} />}
              />
              <Route
                path="/home/AddOrder"
                element={<AddOrder userDetails={userDetails} />}
              />
              <Route path="/home/insights" element={<Insights />} />
            </Route>

            <Route
              exact
              path="/"
              element={<Login setUserDetails={setUserDetails} />}
            />
            <Route
              exact
              path="*"
              element={<NoMatch userDetails={userDetails} />}
            />
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default OrderTracker;
