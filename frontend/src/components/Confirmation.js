import React from "react";
import styled from "styled-components";

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
  border: 2px solid red;
  border-radius: 5px;
  padding: 20px;
  width: 40%;
`;

const Notice = styled.p`
  color: red;
  border-bottom: 2px solid red;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
`;

const CustomerInformation = styled.p`
  margin-top: 10px;
`;

export default Confirmation;
