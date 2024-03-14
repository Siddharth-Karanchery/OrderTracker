import React, { Component } from "react";

import {
  Box,
  Container,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
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
          {/* {props.order.Order.map((item) => {
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
          })} */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "bold", width: "30%" }}
                  >
                    Dish Name
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", width: "20%" }}
                  >
                    Rating
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", width: "50%" }}
                  >
                    Tags
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.order.Order.map((row) => (
                  <TableRow
                    key={row.dishname}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {row.dishname}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <StarIcon
                          fontSize="small"
                          sx={{
                            color: ratingColorHandler(row.rating),
                          }}
                        />
                        <b style={{ color: ratingColorHandler(row.rating) }}>
                          {row.rating}
                        </b>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ display: "flex", flexWrap: "wrap" }}
                    >
                      {row.tags &&
                        row.tags.map((tag) => {
                          return <Chip label={tag} sx={{ margin: "0 5px" }} />;
                        })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
}

export default OrderContents;
