import { Box, Container, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.css";
import NavBar from "../NavBar/NavBar";
function Header(props) {
  const isNotMobile = props.isNotMobile;
  return (
    <Box className="Header">
      <Box className="Header__Web">
        {isNotMobile ? null : (
          <MenuIcon className="Header__MenuIcon" onClick={props.onMenuSelect} />
        )}
        <Container>
          <Typography variant="h4">Order Tracker</Typography>
        </Container>
      </Box>

      {isNotMobile ? <NavBar /> : null}
    </Box>
  );
}

export default Header;
