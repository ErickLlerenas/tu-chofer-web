import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

export default function Chart({ trips }) {
	return (
		<Paper className="dashboard-paper chart-height">
			<Typography
				component="h2"
				variant="h6"
				color="primary"
				gutterBottom
			>
				Cantidad de viajes
			</Typography>
			<ResponsiveContainer>
				<LineChart
					height={200}
					data={trips}
					margin={{
						left: -35,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="day" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="viajes"
						stroke="#da2d84"
						activeDot={{ r: 8 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Paper>
	);
}
