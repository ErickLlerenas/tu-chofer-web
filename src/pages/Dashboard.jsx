import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Costs from '../components/Costs';
import ListDrivers from '../components/listDrivers';
import MyDrawer from '../components/MyDrawer';
import Typography from '@material-ui/core/Typography';
import { db } from "../firebase"
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [driversList, setDriversList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [prices,setPrices] = useState({});
  useEffect(() => {
    var temp = [];

    //Drivers from Firestore
    db.collection('Drivers').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().isAccepted)
          temp.push(doc.data());
      })
      setDriversList([...temp]);
      setIsLoading(false);
    })

    //Prices from Firestore
    db.collection('Prices').doc('actualPrices').get().then((docPrices)=>{
      setPrices(docPrices.data());
    });

  }, []);

  return (
    <div className="flex">
      <CssBaseline />
      <MyDrawer index={0} />
      <main className="drawer-content">
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <h2>Inicio</h2>
          {isLoading ? <CircularProgress color="secondary" className="loading"/>:<Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className="dashboard-paper chart-height">
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            {/* <Grid item xs={12} md={4} lg={3}>
              <Paper className="dashboard-paper">
                <Deposits />
              </Paper>
            </Grid> */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className="dashboard-paper">
                <Costs title="Costo base" price={prices.costoBase}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className="dashboard-paper">
                <Costs title="Costo servicio" price={prices.costoServicio}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className="dashboard-paper">
                <Costs title="Costo kilómetro" price={prices.costoKilometro}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className="dashboard-paper">
                <Costs title="Costo minuto" price={prices.costoMinuto}/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              {driversList.length!=0 &&<Paper className='dashboard-paper'>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Choferes</Typography>
                <ListDrivers driversList={driversList}/>
              </Paper>}
            </Grid>
          </Grid>}
        </Container>
      </main>
    </div>
  );
}