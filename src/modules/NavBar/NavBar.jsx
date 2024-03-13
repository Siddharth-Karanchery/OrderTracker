import React from "react";
import "./NavBar.css";

import { Box, Typography } from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";
import { NavTabs } from "../../data/NavTabs";

import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

// Initialize Firebase
const app = initializeApp({
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FB_DATABASEURL,
  projectId: process.env.REACT_APP_FB_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FB_APPID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENTID,
});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function NavBar(props) {
  const navigate = useNavigate();

  const user = props.userDetails;
  let isLoggedIn = false;
  if (typeof user !== "undefined") {
    user.uid === "cayn87dhFXQYmxCVQ1uv1QUW4nV2"
      ? (isLoggedIn = true)
      : (isLoggedIn = false);
  }
  return (
    <>
      <Box className="Navbar">
        {NavTabs.map((tab) => (
          <Typography
            className="Navbar__Tab"
            variant="subtitle1"
            sx={{ cursor: "pointer", margin: "0 1rem" }}
            onClick={() => {
              navigate({
                pathname: tab.path,
              });
            }}
          >
            {tab.tabName}
          </Typography>
        ))}

        <Typography
          className="Navbar__Tab"
          variant="subtitle1"
          sx={{ cursor: "pointer", margin: "0 1rem" }}
          onClick={() => {
            signOut(auth)
              .then(() => {
                props.setUserDetails({});
                alert("Logged Out successfully!");
                navigate("/login");
              })
              .catch((error) => {
                alert("Something went wrong!");
              });
          }}
        >
          Logout
        </Typography>
      </Box>
    </>
  );
}

export default NavBar;
