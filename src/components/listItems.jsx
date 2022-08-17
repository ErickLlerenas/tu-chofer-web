import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

export default function ItemList({ index }) {
	return (
		<div>
			<a href="/inicio" className="white link">
				<ListItem
					button
					className="listItem"
					style={index === 0 ? { backgroundColor: "#da2d84" } : {}}
				>
					<ListItemIcon>
						<DashboardIcon className="white" />
					</ListItemIcon>
					<ListItemText primary="Inicio" />
				</ListItem>
			</a>
			<a href="/servicio" className="white link">
				<ListItem
					button
					className="listItem"
					style={index === 1 ? { backgroundColor: "#da2d84" } : {}}
				>
					<ListItemIcon>
						<LocalTaxiIcon className="white" />
					</ListItemIcon>
					<ListItemText primary="Servicio" />
				</ListItem>
			</a>
			<a href="/mapa" className="white link">
				<ListItem
					button
					className="listItem"
					style={index === 2 ? { backgroundColor: "#da2d84" } : {}}
				>
					<ListItemIcon>
						<LocationOnIcon className="white" />
					</ListItemIcon>
					<ListItemText primary="Mapa" />
				</ListItem>
			</a>
			<a href="/choferes" className="white link">
				<ListItem
					button
					className="listItem"
					style={index === 3 ? { backgroundColor: "#da2d84" } : {}}
				>
					<ListItemIcon>
						<AirlineSeatReclineNormalIcon className="white" />
					</ListItemIcon>
					<ListItemText primary="Choferes" />
				</ListItem>
			</a>
			<a href="/usuarios" className="white link">
				<ListItem
					button
					className="listItem"
					style={index === 4 ? { backgroundColor: "#da2d84" } : {}}
				>
					<ListItemIcon>
						<PersonIcon className="white" />
					</ListItemIcon>
					<ListItemText primary="Usuarios" />
				</ListItem>
			</a>
			<a href="/usuarios-activos" className="white link">
				<ListItem
					button
					className="listItem"
					style={index === 5 ? { backgroundColor: "#da2d84" } : {}}
				>
					<ListItemIcon>
						<FavoriteIcon className="white" />
					</ListItemIcon>
					<ListItemText primary="Usuarios Activos" />
				</ListItem>
			</a>
			<a href="/mejores-usuarios" className="white link">
				<ListItem
					button
					className="listItem"
					style={index === 6 ? { backgroundColor: "#da2d84" } : {}}
				>
					<ListItemIcon>
						<EmojiEventsIcon className="white" />
					</ListItemIcon>
					<ListItemText primary="Mejores usuarios" />
				</ListItem>
			</a>
			<a href="/solicitudes" className="white link">
				<ListItem
					button
					className="listItem"
					style={index === 7 ? { backgroundColor: "#da2d84" } : {}}
				>
					<ListItemIcon>
						<NotificationsIcon className="white" />
					</ListItemIcon>
					<ListItemText primary="Solicitudes" />
				</ListItem>
			</a>
			<a href="/salir" className="white link">
				<ListItem
					button
					className="listItem"
					style={index === 8 ? { backgroundColor: "#da2d84" } : {}}
				>
					<ListItemIcon>
						<ExitToAppIcon className="white" />
					</ListItemIcon>
					<ListItemText primary="Salir" />
				</ListItem>
			</a>
		</div>
	);
}
