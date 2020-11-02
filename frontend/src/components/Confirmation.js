import React from "react";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";

const Confirmation = ({ userReservation }) => {
  const { id, flight, seat, givenName, surname, email } = userReservation;
  return (
    <Wrapper>
      <Container>
        <Notice>Your flight is confirmed!</Notice>
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
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
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

export default Confirmation;
