import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import MyDrawer from '../components/MyDrawer';
import { db } from '../firebase';
import Chart from '../components/Chart';
import Gains from './Gains';
import HistoryItem from '../components/HistoryItem';
import EmptyHistory from '../components/EmptyHistory';
// import DatePickers from '../components/DatePickers';
import Grid from '@material-ui/core/Grid';
import DriverProfileCard from '../components/DriverProfileCard';
import CarProfileCard from '../components/CarProfileCard';
import DeleteDriverButton from '../components/DeleteDriverButton';

export default function DriverDetails() {

  const [history, setHistory] = useState([]);
  const [driver, setDriver] = useState({});
  const [gains, setGains] = useState([]);
  const [total, setTotal] = useState(0);
  const [IVA, setIVA] = useState(0);
  const [gain, setGain] = useState(0);

  useEffect(() => {
    var temp = []
    var totaltemp = 0;
    history.forEach((gain, index) => {
      temp.push({
        dia: index + 1,
        ganancias: gain.cost
      })
      totaltemp += gain.cost;
    });
    setGains(temp);
    setTotal(totaltemp);
    setIVA(totaltemp * 0.16);
    setGain(totaltemp * 0.84);
  }, [history]);

  useEffect(() => {
    var temp = [];

    const driver = JSON.parse(localStorage.getItem('tu-chofer-driver'));
    if (driver)
      setDriver(driver)
    else
      window.location.href = "/choferes";
    db.collection("Drivers").doc(driver.phone).get().then(function (doc) {
      if (doc.exists) {
        temp = doc.data().history;
        setDriver(doc.data());
      }
      setHistory([...temp]);
    })
  }, [])

  return (
    <div className="flex">
      <CssBaseline />
      <MyDrawer index={3} />
      <main className="drawer-content">
        <Container maxWidth="lg" className='container'>
          <h2>Chofer</h2>
          <Grid container spacing={3} >
            <DriverProfileCard driver={driver} />
            <CarProfileCard driver={driver} />
          </Grid>

          <h2>Historial</h2>
          {/* <DatePickers /> */}

          <Grid container spacing={3}>
            <Grid item xs={9}>
              <Chart gains={gains} />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Gains total={total} IVA={IVA} gain={gain} />
            </Grid>

            {history.map((history, key) => (
              <HistoryItem key={key} history={history} />
            ))}

          </Grid>
          {history.length === 0 &&
            <EmptyHistory />
          }
          <Grid>
            <h2>Eliminar</h2>
            <DeleteDriverButton driver={driver} />
          </Grid>
        </Container>
      </main>
    </div>
  );
}