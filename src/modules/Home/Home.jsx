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
import OrderContents from "../../Components/OrderContents/OrderContents";
import FilterPanel from "../../Components/FilterPanel/FilterPanel";

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
      <OrderContents
        expanded={expanded}
        handleChange={handleChange}
        order={order}
        index={i}
      />
    );
  });
  return (
    <Box className="Home">
      <FilterPanel />
      <Container className="Home__row">{orderContent}</Container>
    </Box>
  );
}

export default Home;
