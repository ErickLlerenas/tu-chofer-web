import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListRequests from "../../components/listRequests";
import MyDrawer from "../../components/MyDrawer";
import { db } from "../../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotificationsOffOutlinedIcon from "@material-ui/icons/NotificationsOffOutlined";

export default function Requests() {
	const [requestsList, setRequestsList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		var temp = [];

		db.collection("Drivers")
			.where("isAccepted", "==", false)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					temp.push(doc.data());
				});
				setRequestsList([...temp]);
				setIsLoading(false);
			});
	}, []);
	return (
		<div className="flex">
			<MyDrawer index={7} />
			<main className="drawer-content">
				<Container maxWidth="lg" className="container">
					<h2>Solicitudes</h2>
					<Grid container>
						<Grid item xs={12}>
							{isLoading ? (
								<CircularProgress
									color="secondary"
									className="loading"
								/>
							) : requestsList.length !== 0 ? (
								<Paper className="paper-table">
									<ListRequests requestsList={requestsList} />
								</Paper>
							) : (
								<div className="empty">
									<NotificationsOffOutlinedIcon className="empty-icon" />
									<br />
									<h2 className="center">
										No hay solicitudes pendientes...
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
