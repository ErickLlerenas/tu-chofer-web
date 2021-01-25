import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default function Chart({gains}) {
  

  return (
    <Paper className="dashboard-paper chart-height">
    <Typography component="h2" variant="h6" color="primary" gutterBottom>Ganancias</Typography>
        <LineChart
        width={window.screen.width/1.9}
        height={200}
          data={gains}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
                   <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ganancias" stroke="#FF9100" activeDot={{ r: 8 }} />
        </LineChart>
    </Paper>
  );
}