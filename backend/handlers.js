"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
let { flights, reservations } = require("./data");

const getFlights = (req, res) => {
  res.status(200).json({
    status: 200,
    data: flights,
  });
};

const getFlight = (req, res) => {
  const id = req.params.id;
  const flightsArray = Object.keys(flights);
  flightsArray.includes(id)
    ? // if so, retrieve the flight data
      res.status(200).json({
        status: 200,
        data: flights[id],
      })
    : // if not, return an error message
      res.status(400).json({
        status: 400,
        message: `Flight ${id} does not exist.`,
      });
};

const addReservations = (req, res) => {
  // create a variable to represent a new client
  const newReservation = {
    // generate a new id (a randomly generated 36 character string)
    id: uuidv4().slice(0, 36),
    // query the body for the user input
    ...req.body,
  };
  // set the availability of the chosen seat to false
  flights[newReservation.flight].forEach((seat) => {
    if (seat.id == newReservation.seat) {
      seat.isAvailable = false;
    }
  });
  // push the new reservation to the reservations array
  reservations.push(newReservation);
  res.status(201).json({
    status: 201,
    message: "The reservation has been successfully created.",
    data: newReservation,
  });
};

const getReservations = (req, res) => {
  res.status(200).json({
    status: 200,
    data: reservations,
  });
};

const getSingleReservation = (req, res) => {
  const reservation = reservations.find(
    (reservation) => reservation.id === req.params.id
  );
  // does the params id reference a reservation in our array
  reservation
    ? // if so, return the flight data
      res.status(200).json({
        status: 200,
        data: reservation,
      })
    : // if not, return an error message
      res.status(400).json({
        status: 400,
        message: "The reservation does not exist.",
      });
};

const deleteReservation = (req, res) => {
  const id = req.params.id;
  // find a reservation based on the provided id
  const foundIndex = reservations.findIndex(
    (reservation) => reservation.id === id
  );
  const flight = reservations[foundIndex].flight;
  // if we found a reservation
  if (foundIndex >= 0) {
    // set the availability of the previously unavailable seat to true
    flights[flight].forEach((seat) => {
      if (seat.id == reservations[foundIndex].seat) {
        seat.isAvailable = true;
      }
    });
    // and delete the reservation
    reservations.splice(foundIndex, 1);
    res.status(200).json({
      status: 200,
      message: "The reservation has been successfully deleted.",
    });
    // if not, return an error message
  } else {
    res.status(400).json({
      status: 400,
      message: `Reservation ${id} does not exist.`,
    });
  }
};

const updateReservation = (req, res) => {
  // find a reservation based on the provided id
  let reservation = reservations.find(
    (reservation) => reservation.id === req.params.id
  );
  // if we found a reservation, reassign the values to those queried from the body
  if (reservation) {
    reservation = { ...req.body };
    res.status(200).json({
      status: 200,
      message: "The reservation has been successfully updated.",
    });
  } else {
    // if not, return an error
    res.status(400).json({
      status: 400,
      message: `Reservation ${id} does not exist.`,
    });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
