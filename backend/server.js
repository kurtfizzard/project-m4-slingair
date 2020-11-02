"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
} = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  // retrieve all flight numbers
  .get("/flights", getFlights)

  // retrieve single flight data (seating)
  .get("/flights/:id", getFlight)

  // retrieve all reservations
  .get("/reservations", getReservations)

  // retrieve a single reservation
  .get("/reservations/:id", getSingleReservation)

  // create a reservation
  .post("/reservations/add", addReservations)

  // delete a reservation This is a requirement, even though the FE of this is a stretch goal.
  .delete("/reservations/:id", deleteReservation)

  // update a reservation This is a requirement, even though the FE of this is a stretch goal.
  .patch("/reservations/:id", updateReservation)

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
