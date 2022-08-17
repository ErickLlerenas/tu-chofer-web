import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ItemList from "./listItems";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import BackgroundImage from "../assets/BackgroundImage.png";

const useStyles = makeStyles(() => ({
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: 275,
		backgroundImage:
			"linear-gradient(rgba(0, 0, 0, 0.85) , rgba(0, 0, 0, 0.85)), url(" +
			BackgroundImage +
			")",
	},
}));

export default function MyDrawerPhoneVersion({ index }) {
	const classes = useStyles();

	return (
		<Drawer
			className="drawer"
			variant="permanent"
			classes={{
				paper: clsx(classes.drawerPaper),
			}}
		>
			<h1>DAY & DAY</h1>
			<Divider
				variant="middle"
				style={{ backgroundColor: "white", height: 0.1 }}
			/>
			<List className="white">
				<ItemList index={index} />
			</List>
		</Drawer>
	);
}
