import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default function Gains({ total, IVA, gain }) {
	return (
		<Paper className="dashboard-paper">
			<Typography
				component="h2"
				variant="h6"
				color="primary"
				gutterBottom
			>
				Total
			</Typography>
			<Typography component="p" variant="h4">
				${total.toFixed(2)}
			</Typography>
			<Typography
				component="h2"
				variant="h6"
				color="primary"
				gutterBottom
			>
				IVA
			</Typography>
			<Typography component="p" variant="h4">
				${IVA.toFixed(2)}
			</Typography>
			<Typography
				component="h2"
				variant="h6"
				color="primary"
				gutterBottom
			>
				Ganancia
			</Typography>
			<Typography component="p" variant="h4">
				${gain.toFixed(2)}
			</Typography>
		</Paper>
	);
}
