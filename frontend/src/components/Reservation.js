import React, { useState } from "react";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";

const Reservation = ({ userReservation, setUserReservation }) => {
  const [reservationId, setReservationId] = useState("");
  const [error, setError] = useState(false);
  // desconstruct userReservation retrieved from local storage or by referencing a particular id
  const { id, flight, seat, givenName, surname, email } = userReservation;
  return (
    <>
      <Wrapper>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            fetch(`/reservations/${reservationId}`)
              .then((res) => res.json())
              .then((data) => {
                if (data.status === 200) {
                  setError(false);
                  setUserReservation(data.data);
                } else {
                  setError(true);
                }
              });
          }}
        >
          <input
            type="text"
            name="reservationId"
            value={reservationId}
            onChange={(ev) => {
              // set reservationId based on the text input
              setReservationId(ev.target.value);
            }}
          />
          {/* <input type="submit" value="Submit" /> */}
          <Button type="submit">Submit</Button>
        </form>
      </Wrapper>
      <Wrapper>
        <Container>
          <Notice>Your reservation:</Notice>
          {/* if there is an error, render an error message */}
          {error ? (
            "The reservation ID that you requested is invalid."
          ) : (
            // if there is no error, render the reservation information
            <>
              <CustomerInformation>
                <strong>Reservation #:</strong> {id}
              </CustomerInformation>
              <CustomerInformation>
                <strong>Flight #:</strong> {flight}
              </CustomerInformation>
              <CustomerInformation>
                <strong>Seat #</strong> {seat}
              </CustomerInformation>
              <CustomerInformation>
                <strong>Name:</strong> {givenName} {surname}
              </CustomerInformation>
              <CustomerInformation>
                <strong>Email:</strong> {email}
              </CustomerInformation>
            </>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Button = styled.button`
  background-color: ${themeVars.alabamaCrimson};
  border: none;
  border-radius: 5px;
  margin-left: 10px;
`;

const Container = styled.div`
  border: 2px solid ${themeVars.alabamaCrimson};
  border-radius: 5px;
  padding: 20px;
`;

const Notice = styled.p`
  color: ${themeVars.alabamaCrimson};
  /* border-bottom: 2px solid ${themeVars.alabamaCrimson}; */
  font-family: ${themeVars.headingFont};
  font-size: 40px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
`;

const CustomerInformation = styled.p`
  font-size: 20px;
  margin-top: 10px;
`;

export default Reservation;
