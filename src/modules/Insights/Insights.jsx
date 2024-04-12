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
  Tooltip,
  Legend,
} from "recharts";

function Insights(props) {
  const [spendingData, setSpendingData] = React.useState([]);
  const [orderNumData, setOrderNumData] = React.useState([]);
  const [cuisineData, setCuisineData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState();

  const getSpendingData = (tempInputData) => {
    let tempData = [];

    tempInputData.forEach((order) => {
      let orderMonth = Number(order.Date.split("T")[0].split("-")[1]);
      let orderYear = Number(order.Date.split("T")[0].split("-")[0]);

      if (spendingData.some((item) => item["month"] === orderMonth)) {
        let index = spendingData.findIndex(
          (item) => item["month"] === orderMonth
        );
        let monthData = spendingData.find(
          (item) => item["month"] === orderMonth
        );
        monthData.amount = monthData.amount + Number(order.Amount);
        tempData[index] = monthData;
      } else if (tempData.some((item) => item["month"] === orderMonth)) {
        let index = tempData.findIndex((item) => item["month"] === orderMonth);
        let monthData = tempData.find((item) => item["month"] === orderMonth);

        monthData.amount = monthData.amount + Number(order.Amount);
        tempData[index] = monthData;
      } else {
        tempData.push({
          month: orderMonth,
          monthName:
            new Date(Date.UTC(2000, orderMonth - 1, 1)).toLocaleString(
              "default",
              { month: "long" }
            ) + ` ${orderYear}`,
          amount: Number(order.Amount),
        });
      }
    });

    setSpendingData(tempData);
  };

  const getOrderNumData = (tempInputData) => {
    let tempData = [];

    tempInputData.forEach((order) => {
      let orderMonth = Number(order.Date.split("T")[0].split("-")[1]);
      let orderYear = Number(order.Date.split("T")[0].split("-")[0]);

      if (orderNumData.some((item) => item["month"] === orderMonth)) {
        let index = orderNumData.findIndex(
          (item) => item["month"] === orderMonth
        );
        let monthData = orderNumData.find(
          (item) => item["month"] === orderMonth
        );
        monthData.count = monthData.count + 1;
        tempData[index] = monthData;
      } else if (tempData.some((item) => item["month"] === orderMonth)) {
        let index = tempData.findIndex((item) => item["month"] === orderMonth);
        let monthData = tempData.find((item) => item["month"] === orderMonth);

        monthData.count = monthData.count + 1;
        tempData[index] = monthData;
      } else {
        tempData.push({
          month: orderMonth,
          monthName:
            new Date(Date.UTC(2000, orderMonth - 1, 1)).toLocaleString(
              "default",
              { month: "long" }
            ) + ` ${orderYear}`,
          count: 1,
        });
      }
    });

    setOrderNumData(tempData);
  };

  const getCuisineData = (tempInputData) => {
    let tempData = [];

    tempInputData.forEach((order) => {
      if (cuisineData.some((item) => item["name"] === order.Category)) {
        let index = cuisineData.findIndex(
          (item) => item["name"] === order.Category
        );
        let categoryData = cuisineData.find(
          (item) => item["name"] === order.Category
        );
        categoryData.count = categoryData.count + 1;
        tempData[index] = categoryData;
      } else if (tempData.some((item) => item["name"] === order.Category)) {
        let index = tempData.findIndex(
          (item) => item["name"] === order.Category
        );
        let categoryData = tempData.find(
          (item) => item["name"] === order.Category
        );

        categoryData.count = categoryData.count + 1;
        tempData[index] = categoryData;
      } else {
        tempData.push({
          name: order.Category,
          count: 1,
          fill:
            "#" +
            ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
        });
      }
    });

    setCuisineData(tempData);
  };

  React.useEffect(() => {
    axios
      .get(
        `https://ordertracker-42ee4-default-rtdb.asia-southeast1.firebasedatabase.app/.json?auth=${process.env.REACT_APP_DBSECRET}`
      )
      .then((response) => {
        const tempInputData = Object.values(response.data.data).filter(
          (row) => row.uid === props.userDetails.uid
        );
        getSpendingData(tempInputData);
        getOrderNumData(tempInputData);
        getCuisineData(tempInputData);
      });

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

  const renderColorfulLegendText = (value: string, entry: any) => {
    console.log("value: ", value);
    return (
      <span style={{ color: "#596579", fontWeight: 500, padding: "10px" }}>
        {value}
      </span>
    );
  };

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
        <Typography variant="h4">Spending Data</Typography>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            width={500}
            height={300}
            data={spendingData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthName" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Container>
      <Container className="Insights__row">
        <Typography variant="h4">Order Count Data</Typography>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={orderNumData}>
            <Bar
              dataKey="count"
              fill="#8884d8"
              label={{ fill: "white", fontSize: 20, fontWeight: "bold" }}
            />
            <XAxis dataKey="monthName" />
            <YAxis />
          </BarChart>
        </ResponsiveContainer>
      </Container>
      <Container className="Insights__row">
        <Typography variant="h4">Cuisine Data</Typography>
        <Box className="Insights__halfrow">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="count"
                isAnimationActive={false}
                data={cuisineData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
                legendType="square"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Container>
    </Box>
  );
}

export default Insights;
