import React from "react";
import "./NoMatch.css";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NoMatch(props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  let navigate = useNavigate();

  React.useEffect(() => {
    if (typeof props.userDetails !== "undefined") {
      props.userDetails.uid === "cayn87dhFXQYmxCVQ1uv1QUW4nV2"
        ? setIsLoggedIn(true)
        : setIsLoggedIn(false);
    }
  }, [props.userDetails]);

  const clickHandler = () => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <Box className="NoMatch">
      <img
        className="NoMatch__image"
        src={require("../../assets/404image.jpg")}
        alt="404 robot"
      />
      <Typography
        variant="h1"
        className="NoMatch__text"
        sx={{ margin: "10px 0" }}
      >
        There's NOTHING here...
      </Typography>
      <Typography
        variant="h4"
        className="NoMatch__text"
        sx={{ margin: "10px 0" }}
      >
        ...the page you are looking for doesn't exist.
      </Typography>
      <Button variant="contained" onClick={clickHandler}>
        {isLoggedIn ? "Go to Home" : "Go to Login"}
      </Button>
    </Box>
  );
}

export default NoMatch;
