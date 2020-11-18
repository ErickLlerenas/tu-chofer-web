import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListRequests from '../components/listRequests';
import MyDrawer from '../components/MyDrawer';
import { db } from "../firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import NotificationsOffOutlinedIcon from '@material-ui/icons/NotificationsOffOutlined';

export default function Requests() {

  const [requestsList, setRequestsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    var temp = [];

    db.collection('Drivers').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (!doc.data().isAccepted)
          temp.push(doc.data());
      })
      setRequestsList([...temp]);
      setIsLoading(false);
    })
  }, []);
  return (
    <div className="flex">
      <CssBaseline />
      <MyDrawer index={5} />
      <main className="drawer-content">
        <Container maxWidth="lg" className='container'>
          <h2>Solicitudes</h2>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {isLoading ?
                <CircularProgress color="secondary" className="loading" />
                : requestsList.length != 0 ? <Paper className='paper-table'>
                  <ListRequests requestsList={requestsList} />
                </Paper> : <div className="empty">
                    <NotificationsOffOutlinedIcon className="empty-icon" /><br />
                    <h2 className="center">No hay solicitudes pendientes...</h2>
                  </div>}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}