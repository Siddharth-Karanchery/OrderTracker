import React from "react";
import "./Home.css";
import Header from "../Header/Header";

import { Box } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";

import { Outlet } from "react-router-dom";

function Home(props) {
  const [showMenu, setShowMenu] = React.useState(false);

  const isNotMobile = useMediaQuery("(min-width:450px)");

  const onMenuSelect = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <Box className="Home">
      <Header
        isNotMobile={isNotMobile}
        onMenuSelect={onMenuSelect}
        userDetails={props.userDetails}
      />
      <Outlet />
    </Box>
  );
}

export default Home;
