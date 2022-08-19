import React from "react";
import Empty from "../assets/images/svg/empty.svg";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export default function EmptyHistory() {
	return (
		<Paper
			style={{
				marginTop: 30,
				marginBottom: 30,
				textAlign: "center",
				padding: 30,
			}}
		>
			<div>
				<img src={Empty} alt="empty" />
				<Typography variant="h6" color="textSecondary" component="p">
					Sin historial
				</Typography>
			</div>
		</Paper>
	);
}
