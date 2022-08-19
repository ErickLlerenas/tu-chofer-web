import React from "react";
import {
	Container,
	Grid,
	Card,
	CardContent,
	Typography,
	Button,
} from "@material-ui/core/";

import MyDrawer from "../../components/MyDrawer";

import { checkIfIsLoggedIn } from "../../helpers/app";
import { removeLocalStorage } from "../../helpers/localStorage";

import { STORAGE_CREDENTIALS } from "../../constants/localStorage";

import SignOutIcon from "../../assets/images/png/signout.png";

export default function Logout() {
	const handleLogout = () => {
		removeLocalStorage(STORAGE_CREDENTIALS);
		checkIfIsLoggedIn();
	};

	return (
		<div className="flex">
			<MyDrawer index={8} />
			<main className="drawer-content">
				<Container
					maxWidth="lg"
					className="container details-container"
				>
					<h2>Salir</h2>
					<Grid container spacing={3} justify="center">
						<Grid item xs={12} md={8} lg={12}>
							<div className="sizedBox"></div>
							<Card className="request-card">
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
									>
										¿Quieres salir?
									</Typography>
									<img
										src={SignOutIcon}
										alt="Log Out"
										className="signout-icon"
									/>
									<Button
										variant="contained"
										color="secondary"
										onClick={handleLogout}
									>
										Salir
									</Button>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
}
