import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import GlobalStyles, { themeVars } from "./GlobalStyles";
import Reservation from "./Reservation";

const App = () => {
  const [userReservation, setUserReservation] = useState({});
  const [reservationId, setReservationId] = useState(null);

  const updateUserReservation = (newData) => {
    setUserReservation({ ...userReservation, ...newData });
  };

  useEffect(() => {
    // TODO: check localStorage for an id
    const customerId = JSON.parse(localStorage.getItem("customerId"));
    console.log(customerId);
    if (customerId) {
      fetch(`/reservations/${customerId}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setUserReservation(res.data);
        });
    }
    // if yes, get data from server and add it to state
  }, [reservationId]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <SeatSelect setReservationId={setReservationId} />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation userReservation={userReservation} />
          </Route>
          <Route path="/view-reservation">
            <Reservation
              userReservation={userReservation}
              setUserReservation={setUserReservation}
            />
          </Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: ${themeVars.background};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;
