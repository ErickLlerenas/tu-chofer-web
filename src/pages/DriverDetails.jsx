import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MyDrawer from '../components/MyDrawer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {db} from '../firebase';
import Swal from 'sweetalert2'

export default function DriverDetails() {

  const [driver, setDriver] = useState({});

  useEffect(() => {
    const driver = JSON.parse(localStorage.getItem('tu-chofer-driver'));
    if(driver)
    setDriver(driver)
    else
    window.location.href = "/choferes";
  }, [])

  const cancelDriverRequest = ()=>{
    db.collection('Drivers').doc(driver.phone).update({
      isAccepted: false
    }).then(()=>{
      Swal.fire({
        allowOutsideClick: false,
        title: 'Chofer eliminado',
        text: `Se ha dado de baja a ${driver.name}.`,
        icon: 'info',
        confirmButtonText: 'Continuar'
      }).then(()=>{
        window.location.href = '/choferes'
      })
    })
  }

  const showALert = ()=>{
    Swal.fire({
      title: '¿Eliminar chofer?',
      text: driver.name+" será dado de baja.\n Volverá a ser un usuario pendiente de ser aceptado como chofer.",
      icon: 'warning',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelDriverRequest();
      }
    })
  } 

  return (
    <div className="flex">
      <CssBaseline />
      <MyDrawer index={3}/>
      <main className="drawer-content">
        <Container maxWidth="lg" className='container'>
          <h2>Chofer</h2>
          <Grid container spacing={3}>
            <Grid item xs={6}>
                <a href={driver.image} target="_blank" rel="noreferrer">
                <Avatar alt="Remy Sharp" src={driver.image} className="avatar" />
                </a>
              <Card className="request-card">
                <div className="sizedBox" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {driver.name}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" component="p">
                    Teléfono:<br /> {driver.phone}
                  </Typography>
                  <br />
                  <Typography variant="h6" color="textSecondary" component="p">
                    Domicilio:<br /> {driver.address}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
                <a href={driver.car} target="_blank" rel="noreferrer">
                <Avatar alt="Remy Sharp" src={driver.car} className="avatar" />
                </a>
              <Card className="request-card">
                <div className="sizedBox" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {driver.carName}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" component="p">
                    Modelo:<br /> {driver.carModel}
                  </Typography>
                  <br />
                  <Typography variant="h6" color="textSecondary" component="p">
                    Placas:<br /> {driver.carPlates}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
      <Button variant="contained" color="primary" className="center cancel" onClick={showALert}>
              Eliminar Chofer
      </Button>
          </Grid>
        </Container>
      </main>
    </div>
  );
}