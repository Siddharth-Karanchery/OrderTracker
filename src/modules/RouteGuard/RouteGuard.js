import React from "react";
import { Navigate } from "react-router-dom";
import AddOrder from "../AddOrder/AddORder";

const RouteGuard = (props) => {
  const user = props.userDetails;

  function hasJWT() {
    let flag = false;

    //check user has loggedIn
    if (typeof user !== "undefined") {
      user.uid === "cayn87dhFXQYmxCVQ1uv1QUW4nV2"
        ? (flag = true)
        : (flag = false);
    }

    return flag;
  }

  return <>{hasJWT() ? props.component : <Navigate to="/login" />}</>;
};

export default RouteGuard;
