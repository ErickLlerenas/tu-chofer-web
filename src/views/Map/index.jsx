import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core/";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Swal from "sweetalert2";

import { db } from "../../firebase";

import MyDrawer from "../../components/MyDrawer";

import { API_KEY } from "../../constants/keys";
import {
	DEFAULT_CENTER,
	MAP_CONTAINER_STYLE,
	MAP_STYLE,
	ZOOM,
} from "./constants";

import Available from "../../assets/images/png/available.png";
import NotAvailable from "../../assets/images/png/not-available.png";

export default function Map() {
	const google = window.google;

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: API_KEY,
	});
	const [markers, setMarkers] = useState([]);

	useEffect(() => {
		const unsubscribe = db
			.collection("Drivers")
			.where("isAccepted", "==", true)
			.where("isActive", "==", true)
			.onSnapshot((querySnapshot) => {
				const drivers = [];

				querySnapshot.forEach((doc) => {
					if (doc.data().currentLocation != null)
						drivers.push(doc.data());
				});
				setMarkers([...drivers]);
			});

		return () => {
			setMarkers([]);
			unsubscribe();
		};
	}, []);

	return (
		<div className="flex">
			<MyDrawer index={2} />
			<main className="drawer-content">
				<Container maxWidth="lg" className="container">
					<h2>Mapa</h2>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							{isLoaded && (
								<GoogleMap
									options={{
										styles: MAP_STYLE,
									}}
									mapContainerStyle={MAP_CONTAINER_STYLE}
									zoom={ZOOM}
									center={DEFAULT_CENTER}
								>
									{markers.length !== 0 &&
										markers.map((marker, key) => (
											<Marker
												onClick={() => {
													Swal.fire({
														icon: "info",
														title: marker.tripID
															.serviceAccepted
															? "Ocupado"
															: "Disponible",
														html: `
                        <p><b id="bold">M: </b>${marker.M && marker.M}</p>
                        <p><b id="bold">Chofer: </b>${marker.name}</p>
                        <p><b id="bold">Teléfono: </b>${marker.phone}</p>
                        <p><b id="bold">Carro: </b>${marker.carName}</p>
                        <p><b id="bold">Modelo: </b>${marker.carModel}</p> 
                        <p><b id="bold">Usuario: </b>${
							marker.tripID.serviceAccepted &&
							marker.tripID &&
							marker.tripID.userID
						}</p>
                        `,
														confirmButtonText:
															"Desactivar chofer",
														showConfirmButton:
															marker.tripID
																.serviceAccepted
																? false
																: true,
													}).then((result) => {
														if (
															!marker.tripID
																.serviceAccepted
														) {
															if (
																result.isConfirmed
															) {
																db.collection(
																	"Drivers"
																)
																	.doc(
																		marker.phone
																	)
																	.update({
																		isActive: false,
																	});
															}
														}
													});
												}}
												key={key}
												position={{
													lat: marker.currentLocation
														.w_,
													lng: marker.currentLocation
														.T_,
												}}
												icon={{
													url: marker.tripID
														.serviceAccepted
														? NotAvailable
														: Available,
													scaledSize:
														new google.maps.Size(
															15,
															15
														),
												}}
											/>
										))}
								</GoogleMap>
							)}
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
}
