import React, { useState } from "react";
import Swal from "sweetalert2";
import {
	Button,
	TextField,
	Grid,
	Paper,
	Box,
	Typography,
} from "@material-ui/core/";

import { setToLocalStorage } from "../../helpers/localStorage";
import { MAIL, PASSWORD } from "../../constants/keys";

import Logo from "../../assets/images/png/Logo.png";
import { STORAGE_CREDENTIALS } from "../../constants/localStorage";

export default function Login() {
	const [credentials, setCredentials] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (PASSWORD === credentials.password && MAIL === credentials.mail) {
			setToLocalStorage(STORAGE_CREDENTIALS, credentials);
			window.location.href = "inicio";
		} else {
			Swal.fire({
				icon: "warning",
				title: "Usuario incorrecto",
				text: "La contraseña o el correo no son correctos",
			});
		}
	};

	const handleChange = ({ target: { name, value } }) => {
		setCredentials({
			...credentials,
			[name]: value,
		});
	};

	return (
		<Grid container className="root">
			<Grid item xs={false} sm={4} md={7} className="backgroundImage" />
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
				style={{ backgroundColor: "#dfe3ff" }}
			>
				<div className="paper">
					<img src={Logo} alt="logo" className="logo" />

					<form className="form" onSubmit={handleSubmit}>
						<TextField
							autoComplete="off"
							onChange={handleChange}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Correo electrónico"
							name="mail"
							type="email"
							color="secondary"
						/>
						<TextField
							autoComplete="off"
							onChange={handleChange}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Contraseña"
							type="password"
							id="password"
							color="secondary"
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className="submit"
						>
							Iniciar sesión
						</Button>

						<Box mt={5}>
							<Typography
								variant="body2"
								color="textSecondary"
								align="center"
							>
								{"Derechos reservados © "}
								DAY & DAY {new Date().getFullYear()}
								{"."}
							</Typography>
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}
