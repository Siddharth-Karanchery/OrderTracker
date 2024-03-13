import React from "react";
import "./Dashboard.css";
import axios from "axios";
import { Box, Container } from "@mui/material";

import OrderContents from "../../Components/OrderContents/OrderContents";
import FilterPanel from "../../Components/FilterPanel/FilterPanel";

function Dashboard() {
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

        setOrderData(tempInputData);
      });
  }, []);

  const handleChange = (element) => (isExpanded) => {
    setExpanded(isExpanded ? element : false);
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
    <Box className="Dashboard">
      <FilterPanel />
      <Container className="Dashboard__row">{orderContent}</Container>
    </Box>
  );
}

export default Dashboard;
