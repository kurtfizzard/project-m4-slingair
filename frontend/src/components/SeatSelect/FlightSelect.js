import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

const FlightSelect = ({ handleFlightSelect }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // TODO: fetch the flight numbers
    fetch("/flights")
      .then((res) => res.json())
      .then(({ data }) => {
        const flights = Object.keys(data);
        setFlights(flights);
      });
  }, []);

  return (
    <Wrapper>
      <label htmlFor="flight">Flight Number :</label>
      {/* TODO: Create a dropdown from the flight numbers */}
      <Dropdown name="flight" id="flight" onChange={handleFlightSelect}>
        <option selected disabled value="">
          Select a Flight
        </option>
        {/* map over the flights and render an option for each flight */}
        {flights.map((flight) => {
          return <option value={flight}>{flight}</option>;
        })}
      </Dropdown>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

const Dropdown = styled.select`
  border: none;
  border-radius: 5px;
  height: 30px;
  margin-left: 20px;
  width: 120px;
`;

export default FlightSelect;
