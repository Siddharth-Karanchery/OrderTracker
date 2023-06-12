import React from "react";
import "./NavBar.css";

import { Box, Typography } from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";
import { NavTabs } from "../../data/NavTabs";

function NavBar() {
  const navigate = useNavigate();
  return (
    <>
      <Box className="Navbar">
        {NavTabs.map((tab) => (
          <Typography
            className="Navbar__Tab"
            variant="subtitle1"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate({
                pathname: tab.path,
                // search: `?${createSearchParams({
                //   cno: chapter.chapterNum,
                // })}`,
              });
            }}
          >
            {tab.tabName}
          </Typography>
        ))}
      </Box>
    </>
  );
}

export default NavBar;
