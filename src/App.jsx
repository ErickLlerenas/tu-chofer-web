import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ActiveUsers from "./views/ActiveUsers/";
import BestUsers from "./views/BestUsers/";
import DashBoard from "./views/Dashboard/";
import Drivers from "./views/Drivers/";
import DriverDetails from "./views/Drivers/Details/";
import Login from "./views/Login/";
import Logout from "./views/Logout/";
import Map from "./views/Map/";
import PageNotFound from "./views/NotFound/";
import Policy from "./views/Policy/";
import Requests from "./views/Requests/";
import RequestDetails from "./views/Requests/Details/";
import Service from "./views/Service/";
import Users from "./views/Users/";
import UserDetails from "./views/Users/Details/";

import { checkIfIsLoggedIn } from "./helpers/app";
import {
	ACTIVE_USERS,
	BEST_USERS,
	DASHBOARD,
	DRIVERS,
	DRIVER_DETAILS,
	LOGIN,
	LOGOUT,
	MAP,
	POLICY,
	REQUESTS,
	REQUESTS_DETAILS,
	SERVICE,
	USERS,
	USERS_DETAILS,
} from "./constants/routes";

function App() {
	useEffect(() => {
		checkIfIsLoggedIn();
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path={ACTIVE_USERS}>
					<ActiveUsers />
				</Route>
				<Route exact path={BEST_USERS}>
					<BestUsers />
				</Route>
				<Route exact path={DASHBOARD}>
					<DashBoard />
				</Route>
				<Route exact path={DRIVERS}>
					<Drivers />
				</Route>
				<Route exact path={DRIVER_DETAILS}>
					<DriverDetails />
				</Route>
				<Route exact path={LOGIN}>
					<Login />
				</Route>
				<Route exact path={LOGOUT}>
					<Logout />
				</Route>
				<Route exact path={MAP}>
					<Map />
				</Route>
				<Route exact path={SERVICE}>
					<Service />
				</Route>
				<Route exact path={USERS}>
					<Users />
				</Route>
				<Route exact path={USERS_DETAILS}>
					<UserDetails />
				</Route>
				<Route exact path={POLICY}>
					<Policy />
				</Route>
				<Route exact path={REQUESTS}>
					<Requests />
				</Route>
				<Route exact path={REQUESTS_DETAILS}>
					<RequestDetails />
				</Route>
				<Route>
					<PageNotFound />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
