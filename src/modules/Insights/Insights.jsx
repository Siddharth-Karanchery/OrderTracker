import React from "react";
import axios from "axios";

import { Box, Button, Container, Typography } from "@mui/material";
import "./Insights.css";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  barChartData,
  lineChartData,
  pieChartData,
} from "../../data/dummyData";

function Insights(props) {
  const [spendingData, setSpendingData] = React.useState([]);
  const [orderNumData, setOrderNumData] = React.useState([]);
  const [cuisineData, setCuisineData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState();

  React.useEffect(() => {
    axios
      .get(
        `https://ordertracker-42ee4-default-rtdb.asia-southeast1.firebasedatabase.app/.json?auth=${process.env.REACT_APP_DBSECRET}`
      )
      .then((response) => {
        const tempInputData = Object.values(response.data.data).filter(
          (row) => row.uid === props.userDetails.uid
        );
      });

    // console.log("from month:", new Date().getMonth() + 1 - 7);
    let fromMonth = new Date().getMonth() + 1 - 5;
    if (fromMonth < 0) {
      const yearsToSubtract = Math.ceil(Math.abs(fromMonth) / 12);
      fromMonth += 12 * yearsToSubtract;
    }
    setDateRange({
      fromDate: fromMonth,
      toDate: new Date().getMonth() + 1,
    });
  }, []);

  return (
    <Box className="Insights">
      <Container className="Insights__Searchpanel">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="From" />
          <DatePicker sx={{ marginLeft: "1rem" }} label="To" />
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
      <Container className="Insights__row">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={lineChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />

            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Container>
      <Container className="Insights__row">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData}>
            <Bar dataKey="uv" fill="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
          </BarChart>
        </ResponsiveContainer>
      </Container>
      <Box className="Insights__halfrow">
        <ResponsiveContainer width="40%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={pieChartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="40%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={pieChartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default Insights;
