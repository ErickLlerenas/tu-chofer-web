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

export default function RequestDetails() {

  const [driver, setDriver] = useState({});

  useEffect(() => {
    const driver = JSON.parse(localStorage.getItem('tu-chofer-driver-request'));
    var img = new Image();
    img.src = driver.image;
    console.log(img.naturalHeight)
    console.log(img.naturalWidth)
    console.log("SADA",driver.image);
    if(driver)
    setDriver(driver)
    else
    window.location.href = "/solicitudes";
  }, [])

  const acceptDriver = ()=>{
    db.collection('Drivers').doc(driver.phone).update({
      isAccepted: true
    }).then(()=>{
      Swal.fire({
        allowOutsideClick: false,
        title: '¡Chofer aceptado!',
        text: `Se ha aceptado a ${driver.name} como nuevo chofer.`,
        icon: 'success',
        confirmButtonText: 'Continuar'
      }).then(()=>{
        window.location.href = '/solicitudes'
      })
    })
  }

  const showALert = ()=>{
    Swal.fire({
      title: '¿Eliminar solicitud?',
      text: driver.name+" podrá mandar otra solicitud si él lo desea.",
      icon: 'warning',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelDriverRequest();
      }
    })
  } 
  const cancelDriverRequest = ()=>{
    db.collection('Drivers').doc(driver.phone).delete().then(()=>{
      Swal.fire({
        allowOutsideClick: false,
        title: 'Solicitud eliminada',
        text: `Se ha eliminado la solicitud de ${driver.name}.`,
        icon: 'info',
        confirmButtonText: 'Continuar'
      }).then(()=>{
        window.location.href = '/solicitudes'
      })
    })
  }

  return (
    <div className="flex">
      <CssBaseline />
      <MyDrawer index={5}/>
      <main className="drawer-content">
        <Container maxWidth="lg" className='container'>
          <h2>Solicitud detalles</h2>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <a href={driver.image} target="_blank" rel="noreferrer">
              <Avatar alt={driver.name} src={driver.image} className="avatar" />
              </a>
              <Card className="request-driver-card center">
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
              <Avatar alt={driver.carName} src={driver.car} className="avatar" />
              </a>
              <Card className="request-driver-card center">
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
            <Button variant="contained" color="secondary" className="center" onClick={acceptDriver}>
              Aceptar Solicitud
      </Button>
      <Button variant="contained" color="primary" className="center cancel" onClick={showALert}>
              Eliminar Solicitud
      </Button>
          </Grid>
        </Container>
      </main>
    </div>
  );
}