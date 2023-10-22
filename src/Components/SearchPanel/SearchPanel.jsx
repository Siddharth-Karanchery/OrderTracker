import React from "react";

import { Button, Container, MenuItem, TextField } from "@mui/material";
import { foodCategories } from "../../data/foodCategory";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

function SearchPanel(props) {
  const [hotelName, setHotelName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [fromDate, setFromDate] = React.useState();
  const [toDate, setToDate] = React.useState();

  return (
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
  );
}

export default SearchPanel;
