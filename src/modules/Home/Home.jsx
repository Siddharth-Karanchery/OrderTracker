import React from "react";
import "./Home.css";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { foodCategories } from "../../data/foodCategory";
import moment from "moment/moment";
import { display } from "@mui/system";

function Home() {
  const [hotelName, setHotelName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [fromDate, setFromDate] = React.useState();
  const [toDate, setToDate] = React.useState();
  const [orderData, setOrderData] = React.useState([]);

  const [expanded, setExpanded] = React.useState(false);

  let filteredData = orderData;

  React.useEffect(() => {
    axios
      .get(
        `https://ordertracker-42ee4-default-rtdb.asia-southeast1.firebasedatabase.app/.json?auth=${process.env.REACT_APP_DBSECRET}`
      )
      .then((response) => {
        const tempInputData = Object.values(response.data.data);
        console.log("tempInputData: ", tempInputData);
        setOrderData(tempInputData);
      });
  }, []);

  const handleChange = (element) => (isExpanded) => {
    setExpanded(isExpanded ? element : false);
  };

  const ratingColorHandler = (rating) => {
    let color = "";
    if (rating > 4) {
      color = "#006d77";
    } else if (rating <= 4 && rating > 3.5) {
      color = "#2a9d8f";
    } else if (rating <= 3.5 && rating > 2.5) {
      color = "#f4a261";
    } else if (rating <= 2.5) {
      color = "#e76f51";
    } else {
      color = "#000000";
    }
    return color;
  };

  let orderContent = filteredData.map((order, i) => {
    return (
      <Accordion
        key={i * 21}
        expanded={expanded === order.HotelName}
        onClick={
          expanded === order.HotelName
            ? handleChange(false)
            : handleChange(order.HotelName)
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          grid
        >
          <Typography className="Home__OrderAcc__Summary">
            Hotel Name: {order.HotelName}
          </Typography>
          <Typography className="Home__OrderAcc__Summary">
            Category: {order.Category}
          </Typography>
          <Typography className="Home__OrderAcc__Summary">
            Date: {moment(order.Date).format("DD MMMM YYYY")}
          </Typography>
          <Typography className="Home__OrderAcc__Summary">
            Rating:
            <StarIcon
              fontSize="small"
              sx={{ color: ratingColorHandler(order.Rating) }}
            />
            <b style={{ color: ratingColorHandler(order.Rating) }}>
              {order.Rating}
            </b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container className="Home__OrderAcc__Detail">
            {order.Order.map((item) => {
              return (
                <Container className="Home__OrderAcc__Detail__Ele">
                  <Typography
                    variant="subtitle2"
                    sx={{
                      my: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <b>{item.dishname}: </b>
                    <StarIcon
                      fontSize="small"
                      sx={{
                        color: ratingColorHandler(item.rating),
                        ml: "1rem",
                      }}
                    />
                    <b style={{ color: ratingColorHandler(item.rating) }}>
                      {item.rating}
                    </b>
                  </Typography>
                </Container>
              );
            })}
          </Container>
        </AccordionDetails>
      </Accordion>
    );
  });
  return (
    <Box className="Home">
      <Container className="Home__Searchpanel">
        <TextField
          label="Hotel Name"
          onChange={(e) => setHotelName(e.target.value)}
          value={hotelName}
        />
        <TextField
          className="AddOrder__Row__Ele"
          sx={{ mx: "1rem", minWidth: "10rem" }}
          select
          label="Category"
        >
          {foodCategories.map((category) => (
            <MenuItem
              key={category.label}
              value={category.label}
              onClick={() => setCategory(category.label)}
            >
              {category.label}
            </MenuItem>
          ))}
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            onChange={(e) => setFromDate(e.$d)}
            value={fromDate}
          />
          <DatePicker
            sx={{ marginLeft: "1rem" }}
            label="To"
            onChange={(e) => setToDate(e.$d)}
            value={toDate}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          className="AddOrder__AddItem"
          //   onClick={submitHandler}
          sx={{
            color: "#fefefe",
            backgroundColor: "#bf4342",
            marginTop: "0.6rem",
            marginLeft: "1rem",
            "&:hover": {
              backgroundColor: "#8c1c13",
            },
          }}
        >
          Search
        </Button>
      </Container>
      <Container className="Home__row">{orderContent}</Container>
    </Box>
  );
}

export default Home;
