import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MyDrawer from '../components/MyDrawer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {db} from '../firebase';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function DriverDetails() {
  const [histories, setHistories] = useState([]);
  const [user, setUser] = useState({});
  const classes = useStyles();

  useEffect(() => {
    var temp = [];
    const user = JSON.parse(localStorage.getItem('tu-chofer-user'));
    if(user)
        setUser(user)
    else
        window.location.href = "/usuarios";

        db.collection("Users").doc(user.phone).get().then(function(doc) {
        if (doc.exists) {
            temp = doc.data().history;
        }
        setHistories([...temp]);
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }, [])
  return (
    <div className="flex">
      <CssBaseline /> 
      <MyDrawer index={4}/>
      <main className="drawer-content">
        <Container maxWidth="lg" className='container details-container'>
          <h2>Usuario</h2>
          <Grid container spacing={3} justify="center">
            <Grid item xs={6}>
              <a href={user.image} target="_blank" rel="noreferrer">
              <Avatar alt="Remy Sharp" src={user.image} className="avatar" />
              </a>
              <Card className="request-card">
                <div className="sizedBox" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  {user.name}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" component="p">
                  Teléfono:<br /> {user.phone}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {histories.map((history, key) => (
              <Grid key={key} item xs={6}>
                <Paper style={{height: "100%"}}>
                <List component="nav" className={classes.root} aria-label="contacts">
                  <ListItem>
                    <ListItemIcon>
                      <DateRangeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Fecha y hora:" secondary={history.date.toDate().toLocaleDateString() + ' ' + history.date.toDate().getHours() + ':' + history.date.toDate().getMinutes()}/>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon style={{color: "#2196F3"}}>
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary="Origen:" secondary={history.origin}/>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon style={{color: "#ff1744"}}>
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary="Destino:" secondary={history.destination}/>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon style={{color: "#1b8f7d"}}>
                      <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Costo:" secondary={"$" + history.cost}/>
                  </ListItem>
                </List>
              </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
}