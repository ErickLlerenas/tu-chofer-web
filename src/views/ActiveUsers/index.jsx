import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListActiveUsers from "../../components/listActiveUsers";
import MyDrawer from "../../components/MyDrawer";
import { db } from "../../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersSlash } from "@fortawesome/free-solid-svg-icons";

export default function ActiveUsers() {
	const [usersList, setUsersList] = useState([]);
	const [driversList, setDriversList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const cancelUserService = (user) => {
		db.collection("Users")
			.doc(user.phone)
			.update({
				tripID: {
					driversList: [],
					isAskingService: false,
				},
			});
	};

	const getUsersActiveList = () => {
		return db
			.collection("Users")
			.where("tripID.isAskingService", "==", true)
			.onSnapshot((querySnapshot) => {
				var temp = [];
				querySnapshot.forEach((doc) => {
					temp.push(doc.data());
				});
				setUsersList([...temp]);
				setIsLoading(false);
			});
	};

	const getDriversAcceptedList = () => {
		return db
			.collection("Drivers")
			.where("tripID.serviceAccepted", "==", true)
			.onSnapshot((querySnapshot) => {
				var temp = [];
				querySnapshot.forEach((doc) => {
					temp.push(doc.data());
					console.log(doc.data().tripID);
				});
				setDriversList([...temp]);
			});
	};

	useEffect(() => {
		getDriversAcceptedList();
		getUsersActiveList();
	}, []);

	return (
		<div className="flex">
			<MyDrawer index={5} />
			<main className="drawer-content">
				<Container maxWidth="lg" className="container">
					<h2>Usuarios activos</h2>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							{isLoading ? (
								<CircularProgress
									color="secondary"
									className="loading"
								/>
							) : usersList.length !== 0 ? (
								<Paper className="paper-table">
									<ListActiveUsers
										usersList={usersList}
										driversList={driversList}
										cancelUserService={cancelUserService}
									/>
								</Paper>
							) : (
								<div className="empty">
									<FontAwesomeIcon
										icon={faUsersSlash}
										className="empty-icon"
									/>
									<br />
									<h2 className="center">
										No hay usuarios activos...
									</h2>
								</div>
							)}
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
}
