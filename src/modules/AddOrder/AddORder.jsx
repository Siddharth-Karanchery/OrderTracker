import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import "./AddOrder.css";
import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { foodCategories } from "../../data/foodCategory";
import { ratingData } from "../../data/DropDownData";

import OutlinedInput from "@mui/material/OutlinedInput";

import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { itemTags, itemTags1 } from "../../data/itemTags";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
  const [category, setCategory] = React.useState("");

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
    setCategory("");
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
    orderDetails.Category = category;
    orderDetails.Order = orderItems;
    console.log("orderDetails: ", orderDetails);
    // axios
    //   .post(
    //     `https://ordertracker-42ee4-default-rtdb.asia-southeast1.firebasedatabase.app/data/.json?auth=${process.env.REACT_APP_DBSECRET}`,
    //     orderDetails
    //   )
    //   .then(function (response) {
    //     alert("Data added successfully!");
    //     resetForm();
    //   })
    //   .catch(function (error) {
    //     alert("Something went wrong! Please try again.");
    //   });
  };

  const dishNameHandler = (id, e) => {
    let temp = orderItems.slice();
    const selectedIndex = orderItems.findIndex((obj) => obj.id === id);
    let selectedOrder = orderItems[selectedIndex];
    selectedOrder.dishname = e.target.value;
    temp[selectedIndex] = selectedOrder;
  };

  const ratingHandler = (id, rating) => {
    let temp = orderItems.slice();
    const selectedIndex = orderItems.findIndex((obj) => obj.id === id);
    let selectedOrder = orderItems[selectedIndex];
    selectedOrder.rating = rating;
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
        <TextField
          className="AddOrder__Row__Ele"
          sx={{ mr: "1rem", minWidth: "10rem" }}
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
            label="Order Date"
            onChange={(e) => setDate(e.$d)}
            value={date}
          />
        </LocalizationProvider>
        <TextField
          className="AddOrder__Row__Ele"
          sx={{ ml: "1rem" }}
          label="Bill Amount"
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          value={amount}
        />

        <TextField
          className="AddOrder__Row__Ele"
          sx={{ ml: "1rem", minWidth: "10rem" }}
          select
          label="Rating"
        >
          {ratingData.map((item) => (
            <MenuItem
              key={item.rating}
              value={item.rating}
              onClick={() => setRating(item.rating)}
            >
              {item.rating}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Typography variant="h5">Items</Typography>
      <Box className="AddOrder__Col">
        {orderItems.map((item) => (
          <Box className="AddOrder__Row mY" id={item.id}>
            <TextField
              label="Dish Name"
              sx={{ marginLeft: "1rem" }}
              onChange={(e) => dishNameHandler(item.id, e)}
            />
            <TextField
              className="AddOrder__Row__Ele"
              sx={{ ml: "1rem", minWidth: "10rem" }}
              select
              label="Rating"
            >
              {ratingData.map((rating) => (
                <MenuItem
                  key={rating.rating}
                  value={rating.rating}
                  onClick={(e) => ratingHandler(item.id, rating.rating)}
                >
                  {rating.rating}
                </MenuItem>
              ))}
            </TextField>
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
