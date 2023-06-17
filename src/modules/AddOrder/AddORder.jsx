import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";

import "./AddOrder.css";
import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

function AddOrder() {
  const [orderItems, setOrderItems] = React.useState([
    {
      id: 0,
      dishname: "",
      rating: "",
    },
  ]);
  const [hotelName, setHotelName] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [date, setDate] = React.useState("");
  const [rating, setRating] = React.useState("");

  const navigate = useNavigate();

  const addItemHandler = () => {
    let temp = orderItems.slice();
    temp.push({
      id: orderItems.length,
      dishname: "",
      rating: "",
    });
    setOrderItems(temp);
  };

  const resetForm = () => {
    setOrderItems([
      {
        id: 0,
        dishname: "",
        rating: "",
      },
    ]);
    setHotelName("");
    setBranch("");
    setAmount("");
    setDate("");
    setRating("");
  };

  const cancelHandler = () => {
    navigate("/");
  };
  const submitHandler = () => {
    let orderDetails = {};
    orderDetails.HotelName = hotelName;
    orderDetails.Branch = branch;
    orderDetails.Date = date;
    orderDetails.Amount = amount;
    orderDetails.Rating = rating;
    orderDetails.Order = orderItems;
    console.log("orderDetails: ", orderDetails);
    resetForm();
  };

  const dishNameHandler = (id, e) => {
    let temp = orderItems.slice();
    const selectedIndex = orderItems.findIndex((obj) => obj.id === id);
    let selectedOrder = orderItems[selectedIndex];
    selectedOrder.dishname = e.target.value;
    temp[selectedIndex] = selectedOrder;
  };

  const ratingHandler = (id, e) => {
    let temp = orderItems.slice();
    const selectedIndex = orderItems.findIndex((obj) => obj.id === id);
    let selectedOrder = orderItems[selectedIndex];
    selectedOrder.rating = e.target.value;
    temp[selectedIndex] = selectedOrder;
  };

  return (
    <Box className="AddOrder">
      <Box className="AddOrder__Row">
        <TextField
          label="Hotel Name"
          onChange={(e) => setHotelName(e.target.value)}
          value={hotelName}
        />
        <TextField
          className="AddOrder__Row__Ele"
          sx={{ margin: "0 1rem" }}
          label="Branch"
          onChange={(e) => setBranch(e.target.value)}
          value={branch}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Order Date"
            onChange={(e) => setDate(e.$d)}
            value={date}
          />
        </LocalizationProvider>
        <TextField
          className="AddOrder__Row__Ele"
          sx={{ margin: "0 1rem" }}
          label="Bill Amount"
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          value={amount}
        />
        <TextField
          sx={{ margin: "0 1rem" }}
          label="Rating"
          onChange={(e) => setRating(e.target.value)}
          value={rating}
        />
      </Box>
      <Typography variant="h5">Items</Typography>
      <Box className="AddOrder__Col">
        {orderItems.map((item) => (
          <Box className="AddOrder__Row mY" id={item.id}>
            <TextField
              label="Dish Name"
              value={item.dishname}
              sx={{ marginLeft: "1rem" }}
              onChange={(e) => dishNameHandler(item.id, e)}
            />
            <TextField
              label="Rating"
              value={item.rating}
              sx={{ marginLeft: "1rem" }}
              onChange={(e) => ratingHandler(item.id, e)}
            />
          </Box>
        ))}
      </Box>
      <Button
        variant="outlined"
        className="AddOrder__AddItem"
        endIcon={<AddIcon />}
        onClick={addItemHandler}
        sx={{ color: "#bf4342", borderColor: "#bf4342", marginTop: "1rem" }}
      >
        Add Item
      </Button>
      <Box className="AddOrder__Row">
        <Button
          variant="outlined"
          className="AddOrder__AddItem"
          onClick={cancelHandler}
          sx={{ color: "#a78a7f", borderColor: "#a78a7f", marginTop: "1rem" }}
        >
          Cancel
        </Button>{" "}
        <Button
          variant="outlined"
          className="AddOrder__AddItem"
          onClick={submitHandler}
          sx={{
            color: "#8c1c13",
            borderColor: "#8c1c13",
            marginTop: "1rem",
            marginLeft: "1rem",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default AddOrder;
