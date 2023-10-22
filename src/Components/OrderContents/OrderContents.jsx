import React, { Component } from "react";

import {
  Container,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import moment from "moment/moment";

import "./OrderContents.css";

function OrderContents(props) {
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

  return (
    <Accordion
      key={props.index * 21}
      expanded={props.expanded === props.order.HotelName}
      onClick={
        props.expanded === props.order.HotelName
          ? props.handleChange(false)
          : props.handleChange(props.order.HotelName)
      }
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        grid
      >
        <Typography className="OrderContents__OrderAcc__Summary">
          Hotel Name: {props.order.HotelName}
        </Typography>
        <Typography className="OrderContents__OrderAcc__Summary">
          Category: {props.order.Category}
        </Typography>
        <Typography className="OrderContents__OrderAcc__Summary">
          Date: {moment(props.order.Date).format("DD MMMM YYYY")}
        </Typography>
        <Typography className="OrderContents__OrderAcc__Summary">
          Rating:
          <StarIcon
            fontSize="small"
            sx={{ color: ratingColorHandler(props.order.Rating) }}
          />
          <b style={{ color: ratingColorHandler(props.order.Rating) }}>
            {props.order.Rating}
          </b>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Container className="OrderContents__OrderAcc__Detail">
          {props.order.Order.map((item) => {
            return (
              <Container className="OrderContents__OrderAcc__Detail__Ele">
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
}

export default OrderContents;
