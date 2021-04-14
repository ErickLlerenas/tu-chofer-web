import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Chart from "../components/Chart";
import Costs from "../components/costs/Costs";
import MyDrawer from "../components/MyDrawer";
import { db } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import Gains from "./Gains";
import DatePickers from "../components/DatePickers";
import moment from "moment";
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [total, setTotal] = useState(0);
  const [IVA, setIVA] = useState(0);
  const [gain, setGain] = useState(0);
  const [dates, setDates] = useState({
    startDate: moment().startOf("month"),
    endDate: moment().day("month"),
  });

  useEffect(() => {
    let drivers = [];
    let histories = [];

    db.collection("Drivers")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().isAccepted) drivers.push(doc.data());
        });
        var totalGains = 0;
        var tempTrips = [];
        drivers.forEach((driver) => {
          driver.history.forEach((history) => {
            if (
              moment(history.date.toDate()).isBetween(
                dates.startDate,
                dates.endDate
              )
            ) {
              histories.push(history);
              totalGains += history.cost;
            }
          });
        });
        for (let i = dates.startDate.dayOfYear(); i <= dates.endDate.dayOfYear(); i++) {
          let tripsCount = 0;
          histories.forEach((history) => {
            if (moment(history.date.toDate()).dayOfYear() === i) tripsCount++;

            tempTrips[i - dates.startDate.dayOfYear()] = {
              viajes: tripsCount,
              day: i,
            };
          });
        }

        setTrips(tempTrips);
        setTotal(totalGains);
        setIVA(totalGains * 0.16);
        setGain(totalGains * 0.84);
        setIsLoading(false);
      });
  }, [dates]);

  return (
    <div className="flex">
      <CssBaseline />
      <MyDrawer index={0}/>

      <main className="drawer-content">
        <Container maxWidth="lg" className="container">
        <Fab color="primary" aria-label="add" className="floating-btn">
        <MenuIcon />
      </Fab>
          <h2>Inicio</h2>
          {isLoading ? (
            <CircularProgress color="secondary" className="loading" />
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <DatePickers dates={dates} setDates={setDates} />
              </Grid>

              <Grid item xs={12} md={6} lg={9}>
                <Chart trips={trips} />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Gains total={total} IVA={IVA} gain={gain} />
              </Grid>
              <Costs />
            </Grid>
          )}
        </Container>
      </main>
    </div>
  );
}
