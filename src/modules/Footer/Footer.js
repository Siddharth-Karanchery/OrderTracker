import { Box, Container, Typography } from "@mui/material";
import "./Footer.css";
function Footer() {
  return (
    <Box className="Footer">
      <Container>
        <Typography variant="subtitle1">Footer Column 1</Typography>
      </Container>
      <Container>
        <Typography variant="subtitle1">Footer Column 2</Typography>
      </Container>
      <Container>
        <Typography variant="subtitle1">Footer Column 3</Typography>
      </Container>
      <Container>
        <Typography variant="subtitle1">Footer Column 4</Typography>
      </Container>
    </Box>
  );
}

export default Footer;
