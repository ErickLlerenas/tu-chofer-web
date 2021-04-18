import React, { Fragment,useEffect,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { db } from "../../firebase"
import Cost from './Cost';
import Km from '../km';

export default function Costs() {

  const [prices, setPrices] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    getPrices();
  },[]);

  const getPrices = ()=>{
    db.collection('Prices').doc('actualPrices').get().then((docPrices) => {
        setPrices(docPrices.data());
        setIsLoading(false);
      });
  };

  return (
    <Fragment>
      <Grid item xs={12} md={6} lg={4}>
        <Paper className="dashboard-paper">
          <Cost title="Costo base" price={prices.costoBase} isLoading={isLoading}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper className="dashboard-paper">
          <Cost title="Costo servicio" price={prices.costoServicio} isLoading={isLoading}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper className="dashboard-paper">
          <Cost title="Costo kilómetro" price={prices.costoKilometro} isLoading={isLoading}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper className="dashboard-paper">
          <Cost title="Costo minuto" price={prices.costoMinuto} isLoading={isLoading}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper className="dashboard-paper">
          <Cost title="Costo kilómetro foráneo" price={prices.costoKilometroForaneo} isLoading={isLoading}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper className="dashboard-paper">
        <Km title="Kilómetros mínimos" price={prices.minKM}/>
        </Paper>
      </Grid>
    </Fragment>
  );
}
