import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MyDrawer from "../components/MyDrawer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import { db } from "../firebase";
import ServiceImg from "../assets/service.png";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Divider from "@material-ui/core/Divider";
import Geocode from "react-geocode";
import firebase from "firebase";

export default function Service() {
	const APIKEY = "AIzaSyB6TIHbzMpZYQs8VwYMuUZaMuk4VaKudeY";

	const [inputs, setInputs] = useState({
		origin: "",
		destination: "",
	});
	let data = {};
	let interval;
	let serviceAccepted = false;

	useEffect(() => {
		Geocode.setApiKey(APIKEY);
		Geocode.setRegion("es");
	}, []);

	const handleFireBaseOnSnapshot = () => {
		var unsubscribe = db
			.collection("Drivers")
			.where("isAccepted", "==", true)
			.where("isActive", "==", true)
			.onSnapshot(function (snapshot) {
				snapshot.forEach(async (driver) => {
					if (driver.data().tripID.userID === inputs.phone) {
						await db
							.collection("Users")
							.doc(inputs.phone)
							.get()
							.then((user) => {
								if (user.exists) {
									if (user.data().tripID != null) {
										if (
											user.data().tripID.isAskingService
										) {
											Swal.close();
											serviceAccepted = true;
											showAcceptedServiceAlert(driver);
											unsubscribe();
											clearInterval(interval);
											cleanDriversList();
										}
									}
								}
							});
					}
				});
			});
	};

	const cleanDriversList = async () => {
		await db
			.collection("Users")
			.doc(inputs.phone)
			.update({
				tripID: {
					driversList: [],
					isAskingService: true,
				},
			});
	};

	const cancelRequest = async () => {
		await db
			.collection("Users")
			.doc(inputs.phone)
			.update({
				tripID: {
					driversList: [],
					isAskingService: false,
				},
			});
		showCanceledServiceAlert();
	};

	const showCanceledServiceAlert = () => {
		Swal.fire(
			"Servicio cancelado.",
			"Se ha cancelado el servicio.",
			"error"
		);
	};

	const showAcceptedServiceAlert = (driver) => {
		Swal.fire({
			icon: "success",
			html: `<p><b id="bold">Nombre: </b>${driver.data().name}</p>
             <p><b id="bold">Carro: </b>${driver.data().carName}</p>
             <p><b id="bold">Modelo: </b>${driver.data().carModel}</p>
      `,
			title: "Servicio aceptado",
		});
	};

	const handleClick = () => {
		if (validatedInputs())
			if (validatedPhone()) showConfirmAlert();
			else showWrongNumberAlert();
		else showIncompleteFieldsAlert();
	};

	const showConfirmAlert = () => {
		Swal.fire({
			icon: "question",
			title: "¿Los datos son correctos?",
			html:
				"<p><b id='bold'>Teléfono: </b>" +
				inputs.phone +
				"</p><p><b id='bold' >Nombre:</b> " +
				inputs.name +
				"</p><p><b id='bold'>Origen:</b> " +
				inputs.origin +
				"</p> <p><b id='bold'>Destino:</b> " +
				inputs.destination +
				"</p>",
			confirmButtonText: "Confirmar",
		}).then((value) => {
			if (value.isConfirmed) handleConfirmed();
		});
	};

	const showIncompleteFieldsAlert = () => {
		Swal.fire({
			icon: "warning",
			title: "Rellena todos los campos",
			html: "Es necesario rellenar todos los campos.",
			confirmButtonText: "Ok",
		});
	};

	const showWrongNumberAlert = () => {
		Swal.fire({
			icon: "warning",
			title: "Teléfono incorrecto",
			html: "Ingresa un número de teléfono de 10 dígitos.",
			confirmButtonText: "Ok",
		});
	};

	const showLookingForDriversAlert = () => {
		Swal.fire({
			icon: "info",
			title: "Buscando choferes...",
			html: "Espera mientras un chofer acepta la solicitud.<br/>",
			allowOutsideClick: false,
			showConfirmButton: true,
			confirmButtonText: "Cancelar búsqueda",
			confirmButtonColor: "#246BB0",
		}).then((result) => {
			if (result.isConfirmed) {
				serviceAccepted = false;
				clearInterval(interval);
				cancelRequest();
			}
		});
	};

	const saveData = (newData) => {
		data = newData;
		return data;
	};

	const handleConfirmed = async () => {
		serviceAccepted = false;
		clearInterval(interval);
		showLookingForDriversAlert();
		handleFireBaseOnSnapshot();

		var originCoordinates = await getOriginCoordinates();
		var destinationCoordinates = await getDestinationCoordinates();
		saveData({ ...data, originCoordinates, destinationCoordinates });
		getDistanceAndDuration(originCoordinates, destinationCoordinates);
	};

	const getOriginCoordinates = async () => {
		var response = await Geocode.fromAddress(inputs.origin);
		return response.results[0].geometry.location;
	};

	const getDestinationCoordinates = async () => {
		var response = await Geocode.fromAddress(inputs.destination);
		return response.results[0].geometry.location;
	};

	const validatedInputs = () => {
		if (inputs.name && inputs.phone && inputs.origin && inputs.destination)
			return true;
		else return false;
	};

	const validatedPhone = () => {
		if (inputs.phone.length === 10) return true;
		else return false;
	};

	const getDistanceAndDuration = async (
		originCoordinates,
		destinationCoordinates
	) => {
		const google = window.google;
		const directionsService = new google.maps.DirectionsService();

		directionsService.route(
			{
				origin: originCoordinates,
				destination: destinationCoordinates,
				travelMode: google.maps.TravelMode.DRIVING,
			},
			(result, status) => {
				if (status === google.maps.DirectionsStatus.OK)
					handleDistanceAndDuration(result);
			}
		);
	};

	const handleDistanceAndDuration = async (result) => {
		var distanceValue = result.routes[0].legs[0].distance.value;
		var durationValue = result.routes[0].legs[0].duration.value;
		var distanceText = result.routes[0].legs[0].distance.text;
		var durationText = result.routes[0].legs[0].duration.text;
		var price = await calculatePricing(distanceValue, durationValue);
		saveData({ ...data, distanceText, durationText, price });
		await getClosestDriversList();
	};

	const getPricingValues = async () => {
		const response = await db
			.collection("Prices")
			.doc("actualPrices")
			.get();
		return response.data();
	};

	const calculatePricing = async (distanceValue, durationValue) => {
		let pricing = await getPricingValues();
		let price = pricing.costoServicio;

		if (distanceValue > pricing.minKM * 1000) {
			price += parseInt(
				((distanceValue - pricing.minKM * 1000) / 1000) *
					pricing.costoKilometro +
					pricing.costoBase +
					(durationValue / 60) * pricing.costoMinuto
			);
		}
		switch (price.toString()[price.toString().length - 1]) {
			case "1": {
				price += 4;
				break;
			}

			case "2": {
				price += 3;
				break;
			}

			case "3": {
				price += 2;
				break;
			}

			case "4": {
				price += 1;
				break;
			}

			case "5": {
				price += 0;
				break;
			}

			case "6": {
				price += 4;
				break;
			}
			case "7": {
				price += 3;
				break;
			}

			case "8": {
				price += 2;
				break;
			}

			case "9": {
				price += 1;
				break;
			}
			default:
				break;
		}
		return price;
	};

	const getDriverDistance = async (
		driverOrigin,
		driversList,
		driverID,
		length
	) => {
		var distanceLat = Math.abs(
			Math.abs(data.originCoordinates.lat) - Math.abs(driverOrigin.w_)
		);
		var distanceLng = Math.abs(
			Math.abs(data.originCoordinates.lng) - Math.abs(driverOrigin.T_)
		);
		var driverDstance = distanceLat + distanceLng;
		handleDriverDistance(driverDstance, driversList, driverID, length);
	};

	const handleDriverDistance = (
		driverDstance,
		driversList,
		driverID,
		length
	) => {
		driversList.push({ distance: driverDstance, driver: driverID });
		driversList.sort(function (a, b) {
			if (a.distance > b.distance) {
				return 1;
			}
			if (a.distance < b.distance) {
				return -1;
			}
			return 0;
		});

		// this validation is for only making one request to firebase, once all drivers have been sorted
		if (driversList.length === length) {
			const userData = saveData({ ...data, driversList });
			removeDriverAfter11Seconds(userData);
			console.log(driversList);
		}
	};

	const removeDriverAfter11Seconds = (userData) => {
		if (!serviceAccepted) {
			updateDataToFirebase(userData);
			interval = setInterval(() => {
				if (!serviceAccepted) {
					userData.driversList.splice(0, 1);
					if (userData.driversList.length !== 0)
						updateDataToFirebase(userData);
					if (userData.driversList.length === 0) {
						clearInterval(interval);
						showNotDriversAvailableAlert();
					}
				}
			}, 11000);
		}
	};

	const showNotDriversAvailableAlert = () => {
		db.collection("Users")
			.doc(inputs.phone)
			.update({
				tripID: {
					driversList: [],
					isAskingService: false,
				},
			})
			.then(() => {
				Swal.fire(
					"Sin choferes.",
					"No hay choferes disponibles por el momento. El servicio ha sido cancelado.",
					"warning"
				);
			});
	};

	const handleChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const getClosestDriversList = async () => {
		let driversList = [];
		let activeDrivers = [];
		const drivers = await db.collection("Drivers").get();
		drivers.forEach((driver) => {
			if (driver.data().isAccepted) {
				if (driver.data().isActive) {
					/*If the driver phone is not the same phone of the person who is making the request, I mean, 
          without this validation the driver could ask a service to himself*/
					if (driver.data().phone !== inputs.phone) {
						if (driver.data().tripID != null) {
							if (driver.data().currentLocation != null) {
								if (!driver.data().tripID.serviceAccepted) {
									activeDrivers.push(driver.data());
								}
							}
						}
					}
				}
			}
		});
		/*I created two loops, which apparently are the same, but the first loop is to know
    the length of the active drivers, the second one to make request with the length*/

		for (let driver in activeDrivers) {
			getDriverDistance(
				activeDrivers[driver].currentLocation,
				driversList,
				activeDrivers[driver].phone,
				activeDrivers.length
			);
		}
		if (activeDrivers.length === 0) {
			showNotDriversAvailableAlert();
		}
	};

	const updateDataToFirebase = async (userData) => {
		await db
			.collection("Users")
			.doc(inputs.phone)
			.get()
			.then(async (user) => {
				if (user.exists) updateDataWithRegieteredUser(userData);
				else createDataWithNewUser(userData);
			});
	};

	const updateDataWithRegieteredUser = async (userData) => {
		await db
			.collection("Users")
			.doc(inputs.phone)
			.update({
				trip: {
					destinationName: inputs.destination,
					originName: inputs.origin,
					origin: new firebase.firestore.GeoPoint(
						userData.originCoordinates.lat,
						userData.originCoordinates.lng
					),
					destination: new firebase.firestore.GeoPoint(
						userData.destinationCoordinates.lat,
						userData.destinationCoordinates.lng
					),
					distance: userData.distanceText,
					price: userData.price,
					duration: userData.durationText,
				},
				tripID: {
					driversList: userData.driversList,
					isAskingService: true,
				},
			});
	};

	const createDataWithNewUser = async (userData) => {
		await db
			.collection("Users")
			.doc(inputs.phone)
			.set({
				phone: inputs.phone,
				name: inputs.name,
				history: [],
				messages: [
					{
						message:
							"¡Hola " +
							inputs.name +
							"😄!  ¿Tienes alguna duda? Mándanos un mensaje y te responderemos en seguida...",
						name: "DAY & DAY",
					},
				],
				trip: {
					destinationName: inputs.destination,
					originName: inputs.origin,
					origin: new firebase.firestore.GeoPoint(
						userData.originCoordinates.lat,
						userData.originCoordinates.lng
					),
					destination: new firebase.firestore.GeoPoint(
						userData.destinationCoordinates.lat,
						userData.destinationCoordinates.lng
					),
					distance: userData.distanceText,
					price: userData.price,
					duration: userData.durationText,
				},
				tripID: {
					driversList: userData.driversList,
					isAskingService: true,
				},
			});
	};

	return (
		<div className="flex">
			<CssBaseline />
			<MyDrawer index={1} />
			<main className="drawer-content">
				<Container
					maxWidth="lg"
					className="container details-container"
				>
					<h2>Servicio</h2>
					<Grid container spacing={3} justify="center">
						<Grid item sm={12} md={8} lg={6}>
							<div className="sizedBox"></div>
							<Card className="request-card">
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
									>
										Crear nuevo servicio
									</Typography>
									<img
										src={ServiceImg}
										alt="Serviceimg"
										className="service-icon"
									/>
									<Typography
										gutterBottom
										variant="h6"
										component="p"
										className="grey-text"
									>
										Información del usuario
									</Typography>
									<TextField
										autoComplete="off"
										className="margin"
										id="outlined-basic"
										label="Número de telefono"
										variant="outlined"
										type="number"
										onChange={handleChange}
										name="phone"
									/>
									<TextField
										className="margin"
										id="outlined-basic"
										label="Nombre"
										variant="outlined"
										onChange={handleChange}
										name="name"
									/>{" "}
									<Divider className="margin" />
									<Typography
										gutterBottom
										variant="h6"
										component="p"
										className="grey-text"
									>
										Información del viaje
									</Typography>
									<GooglePlacesAutocomplete
										className="margin"
										name="origin"
										apiKey={APIKEY}
										selectProps={{
											placeholder: "Origen...",
											onChange: (place) => {
												setInputs({
													...inputs,
													origin: place.label,
												});
											},
										}}
									/>
									<br />
									<GooglePlacesAutocomplete
										className="margin"
										name="destination"
										apiKey={APIKEY}
										selectProps={{
											placeholder: "Destino...",
											onChange: (place) =>
												setInputs({
													...inputs,
													destination: place.label,
												}),
										}}
									/>
									<br />
									<Button
										className="margin"
										variant="contained"
										color="secondary"
										onClick={handleClick}
									>
										Crear servicio
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
