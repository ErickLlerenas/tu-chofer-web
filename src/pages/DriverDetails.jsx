import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MyDrawer from '../components/MyDrawer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { db } from '../firebase';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'
import Empty from '../assets/empty.svg';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function DriverDetails() {
  const [history, setHistory] = useState([]);

  const [driver, setDriver] = useState({});
  const classes = useStyles();

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
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }, [])

  const cancelDriverRequest = () => {
    db.collection('Drivers').doc(driver.phone).update({
      isAccepted: false
    }).then(() => {
      Swal.fire({
        allowOutsideClick: false,
        title: 'Chofer eliminado',
        text: `Se ha dado de baja a ${driver.name}.`,
        icon: 'info',
        confirmButtonText: 'Continuar'
      }).then(() => {
        window.location.href = '/choferes'
      })
    })
  }

  const showALert = () => {
    Swal.fire({
      title: '¿Eliminar chofer?',
      text: driver.name + " será dado de baja.\n Volverá a ser un usuario pendiente de ser aceptado como chofer.",
      icon: 'warning',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelDriverRequest();
      }
    })
  }
  const showEditALert = () => {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Siguiente',
      showCancelButton: false,
      progressSteps: ['1', '2', '3']
    }).queue([{
      title:'M',
      inputValue:driver.M?driver.M:''
    },
    {
      title:'Nombre',
      inputValue:driver.name
    },
    {
      title:'Domicilio',
      inputValue:driver.address
    }
    ]).then((result) => {
      if (result.value) {
        Swal.fire({
          title: '¿Guardar?',
          html: `
          <p><b id="bold">M: </b>${result.value[0]}</p>
          <p><b id="bold">Nombre: </b>${result.value[1]}</p>
          <p><b id="bold">Domicilio: </b>${result.value[2]}</p>
          `,
          confirmButtonText: 'Guardar'
        }).then((confirm) => {
          if (confirm.isConfirmed) {
            db.collection('Drivers').doc(driver.phone).update({
              M: result.value[0],
              name: result.value[1],
              address: result.value[2]
            }).then(() => {
              Swal.fire(
                'Datos guardados',
                'Se han actualizado los datos',
                'success'
              ).then(()=>{
                window.location.reload();

              })
            });
          }
        });
      }
    })
  }
  return (
    <div className="flex">
      <CssBaseline />
      <MyDrawer index={3} />
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
                  {driver.M &&
                    <Typography gutterBottom variant="h5" component="h2">
                      {driver.M}
                    </Typography>}
                  <Typography variant="h6" color="textSecondary" component="p">
                    Teléfono:<br /> {driver.phone}
                  </Typography>
                  <br />
                  <Typography variant="h6" color="textSecondary" component="p">
                    Domicilio:<br /> {driver.address}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={showEditALert}>
                    Editar
                  </Button>
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

          <h2>Historial</h2>
          <Divider/>
          <div className="sizedBox"></div>
          <Grid container spacing={3}>
            {history.map((history, key) => (
              <Grid key={key} item xs={6}>
                <Paper style={{ height: "100%" }}>
                  <List component="nav" className={classes.root} aria-label="contacts">
                    <ListItem>
                      <ListItemIcon>
                        <DateRangeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Fecha y hora:" secondary={history.date.toDate().toLocaleDateString() + ' ' + history.date.toDate().getHours() + ':' + history.date.toDate().getMinutes()} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon style={{ color: "#2196F3" }}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary="Origen:" secondary={history.origin} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon style={{ color: "#ff1744" }}>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary="Destino:" secondary={history.destination} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon style={{ color: "#1b8f7d" }}>
                        <AttachMoneyIcon />
                      </ListItemIcon>
                      <ListItemText primary="Costo:" secondary={"$" + history.cost} />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            ))}
            {history.length===0 && 
            <div className="center">
              <img src={Empty} alt="empty"/>
              <Typography variant="h6" color="textSecondary" component="p">
                    Sin historial
                  </Typography>
              </div>}
          </Grid>
        </Container>
      </main>
    </div>
  );
}