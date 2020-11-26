import React from 'react'
import SignIn from './pages/SignIn';
import DashBoard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import Drivers from './pages/Drivers';
import Users from './pages/Users';
import Requests from './pages/Requests';
import RequestDetails from './pages/RequestDetails';
import DriverDetails from './pages/DriverDetails';
import DriversMap from './pages/DriversMap';
import Chats from './pages/Chats'
import Chat from './pages/Chat'


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route exact path="/inicio">
          <DashBoard />
        </Route>
        <Route exact path="/choferes">
          <Drivers/>
        </Route>
        <Route exact path="/mapa">
          <DriversMap/>
        </Route>
        <Route exact path="/usuarios">
          <Users/>
        </Route>
        <Route exact path="/choferes/detalles">
          <DriverDetails/>
        </Route>
        <Route exact path="/solicitudes">
          <Requests/>
        </Route>
        <Route exact path="/solicitudes/detalles">
          <RequestDetails/>
        </Route>
        <Route exact path="/Mensajes">
          <Chats/>
        </Route>
        <Route exact path="/Chat">
          <Chat/>
        </Route>
        <Route >
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
