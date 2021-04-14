import React, { useEffect } from "react";

// pages
import SignIn from "./pages/SignIn";
import DashBoard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Drivers from "./pages/Drivers";
import Users from "./pages/Users";
import Requests from "./pages/Requests";
import RequestDetails from "./pages/RequestDetails";
import DriverDetails from "./pages/DriverDetails";
import DriversMap from "./pages/DriversMap";
import UserDetails from "./pages/UserDetails";
import Service from "./pages/Service";
import SignOut from "./pages/SignOut";
import ActiveUsers from "./pages/ActiveUsers";

// react router dom
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BestUsers from "./pages/BestUsers";
import Policy from "./pages/Policy";

function App() {
  useEffect(() => {
    if (checkIfLogedIn());
  }, []);

  const checkIfLogedIn = () => {
    const credentials = JSON.parse(
      localStorage.getItem("tu-chofer-credentials")
    );
    if (credentials === null) {
      if (window.location.pathname !== "/" && window.location.pathname !== "/politica-de-privacidad") {
        window.location.href = "/";
      }
    } else {
      return true;
    }
  };

  return (
    <Router>
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
        <Route exact path="/mejores-usuarios">
          <BestUsers />
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
        <Route exact path="/politica-de-privacidad">
          <Policy />
        </Route>
        <Route exact path="/salir">
          <SignOut />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
