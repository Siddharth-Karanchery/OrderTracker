import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";

import "./AddOrder.css";
import React from "react";
function AddOrder() {
  const [orderItems, setOrderItems] = React.useState([
    {
      id: 0,
      dishname: "",
      rating: "",
    },
  ]);

  console.log("orderItems: ", orderItems);

  const addItemHandler = () => {
    let temp = orderItems.slice();
    temp.push({
      id: orderItems.length,
      dishname: "",
      rating: "",
    });
    setOrderItems(temp);
    console.log("orderItems: ", orderItems);
  };

  return (
    <Box className="AddOrder">
      <Box className="AddOrder__Row">
        <TextField label="Hotel Name" defaultValue="" />
        <TextField
          className="AddOrder__Row__Ele"
          sx={{ margin: "0 1rem" }}
          label="Branch"
          defaultValue=""
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Order Date" onChange={(e) => console.log(e.$d)} />
        </LocalizationProvider>
        <TextField
          className="AddOrder__Row__Ele"
          sx={{ margin: "0 1rem" }}
          label="Bill Amount"
          defaultValue=""
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
        <TextField
          //   className="AddOrder__Row__Ele"
          sx={{ margin: "0 1rem" }}
          label="Rating"
          defaultValue=""
        />
      </Box>
      <Typography variant="h5">Items</Typography>
      <Box className="AddOrder__Col">
        {orderItems.map((item) => (
          <Box className="AddOrder__Row mY" id={item.id}>
            <TextField
              label="Dish Name"
              defaultValue=""
              sx={{ marginLeft: "1rem" }}
            />
            <TextField
              label="Rating"
              defaultValue=""
              sx={{ marginLeft: "1rem" }}
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
          //   onClick={addItemHandler}
          sx={{ color: "#a78a7f", borderColor: "#a78a7f", marginTop: "1rem" }}
        >
          Cancel
        </Button>{" "}
        <Button
          variant="outlined"
          className="AddOrder__AddItem"
          //   onClick={addItemHandler}
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
