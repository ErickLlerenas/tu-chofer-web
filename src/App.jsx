import React, { useEffect, useState } from 'react'
import SignIn from './pages/SignIn';
import DashBoard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import Drivers from './pages/Drivers';
import Users from './pages/Users';
import Requests from './pages/Requests';
import RequestDetails from './pages/RequestDetails';
import DriverDetails from './pages/DriverDetails';
import DriversMap from './pages/DriversMap';
import Messages from './pages/Messages'
import Chat from './pages/Chat'
import UserDetails from './pages/UserDetails'
import Service from './pages/Service'
import { db } from "./firebase";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignOut from './pages/SignOut';
import ActiveUsers from './pages/ActiveUsers';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });  
  const [userMessages, setUserMessages] = useState([]);
  const [driverMessages, setDriverMessages] = useState([]);
  var userMessagesCount = parseInt(localStorage.getItem('tu-chofer-userMessagesCount'));
  var driverMessagesCount = parseInt(localStorage.getItem('tu-chofer-driverMessagesCount'));
  const { vertical, horizontal, open } = state;


  useEffect(() => {
    if (checkIfLogedIn());
    checkMessagesSnapshot();
  }, [])

  useEffect(() => {
    checkIfNewMessage();
  }, [driverMessages, userMessages])

  const handleAlert = (newState)=>{
    setState({ open: true, ...newState });
  }

  const checkIfNewMessage = async()=>{
    var newMessage = false;
    const drivers = await db.collection('Drivers').get();
    drivers.forEach((driver)=>{
      if (driver.data().messages[driver.data().messages.length - 1].name !== "Tu Chofer") {
        newMessage = true;
      }
    })
    const users = await db.collection('Users').get();
    users.forEach((user)=>{
      if (user.data().messages[user.data().messages.length - 1].name !== "Tu Chofer") {
        newMessage = true;
      }
    })
    if(newMessage){
      if (window.location.pathname !== "/")
      handleAlert({ vertical: 'top', horizontal: 'right' })
    }
    
  }

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const checkIfLogedIn = () => {
    const credentials = JSON.parse(localStorage.getItem('tu-chofer-credentials'));
    if (credentials === null) {
      if (window.location.pathname !== "/") { window.location.href = "/" }
    } else {
      return true
    }
  }
  const checkMessagesSnapshot = () => {
    db.collection("Drivers")
      .get(function (snapshot) {
        let temp = [];
        let count = 0;
        snapshot.forEach((driver) => {
          if (driver.data().messages[driver.data().messages.length - 1].name !== "Tu Chofer") {
            temp.push(driver.data().messages);
            count += driver.data().messages.length;
          }
        });
        if (driverMessagesCount !== count) {
          driverMessagesCount = count;
          localStorage.setItem('tu-chofer-driverMessagesCount',count)
          setDriverMessages(temp);
        }
      });

    db.collection("Users")
      .get(function (snapshot) {
        let temp = [];
        let count = 0;
        snapshot.forEach((user) => {
          if (user.data().messages[user.data().messages.length - 1].name !== "Tu Chofer") {
            temp.push(user.data().messages);
            count += user.data().messages.length;
          }
        });
        if (userMessagesCount !== count) {
          userMessagesCount = count;
          localStorage.setItem('tu-chofer-userMessagesCount',count)
          setUserMessages(temp);
        }
      });

  }

  return (
    <Router>
     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}   anchorOrigin={{ vertical, horizontal }}
>
  <Alert onClose={handleClose} severity="info">
    ¡Nuevo mensaje!
  </Alert>
</Snackbar>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route exact path="/inicio">
          <DashBoard />
        </Route>
        <Route exact path="/servicio">
          <Service />
        </Route>
        <Route exact path="/choferes">
          <Drivers />
        </Route>
        <Route exact path="/mapa">
          <DriversMap />
        </Route>
        <Route exact path="/usuarios">
          <Users />
        </Route>
        <Route exact path="/usuarios-activos">
          <ActiveUsers />
        </Route>
        <Route exact path="/usuarios/detalles">
          <UserDetails />
        </Route>
        <Route exact path="/choferes/detalles">
          <DriverDetails />
        </Route>
        <Route exact path="/solicitudes">
          <Requests />
        </Route>
        <Route exact path="/solicitudes/detalles">
          <RequestDetails />
        </Route>
        <Route exact path="/mensajes">
          <Messages />
        </Route>
        <Route exact path="/chat">
          <Chat />
        </Route>
        <Route exact path="/salir">
          <SignOut />
        </Route>
        <Route >
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
