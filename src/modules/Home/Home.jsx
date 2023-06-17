import React from "react";
import "./Home.css";
import axios from "axios";

function Home() {
  const [orderData, setOrderData] = React.useState([]);

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

  return <div>Home</div>;
}

export default Home;
