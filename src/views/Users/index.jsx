import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, CircularProgress } from "@material-ui/core/";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersSlash } from "@fortawesome/free-solid-svg-icons";

import { handleUsers } from "./serviceHelper";
import { db } from "../../firebase";

import RegisteredUsers from "../../components/RegisteredUsers";
import Search from "../../components/Search";
import ListUsers from "../../components/listUsers";
import MyDrawer from "../../components/MyDrawer";

export default function Users() {
	const [usersList, setUsersList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState("");

	const getUsers = async () => {
		try {
			const querySnapshot = await db.collection("Users").get();
			const users = handleUsers(querySnapshot);
			setUsersList(users);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getUsers();

		return () => {
			setUsersList([]);
			setIsLoading(true);
			setSearch("");
		};
	}, []);

	return (
		<div className="flex">
			<MyDrawer index={4} />
			<main className="drawer-content">
				<Container maxWidth="lg" className="container">
					<h2>Usuarios</h2>
					<Grid container spacing={3}>
						<Grid item xs={12} md={9}>
							{!isLoading && <Search setSerach={setSearch} />}
						</Grid>
						<Grid item xs={12} md={3}>
							{!isLoading && (
								<RegisteredUsers usersList={usersList} />
							)}
						</Grid>
						<Grid item xs={12}>
							{isLoading ? (
								<CircularProgress
									color="secondary"
									className="loading"
								/>
							) : usersList.length !== 0 ? (
								<Paper className="paper-table">
									<ListUsers
										usersList={usersList}
										ranked={false}
										search={search}
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
										No hay usuarios registrados...
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
