import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';import Typography from '@material-ui/core/Typography';


const data = [
  {
    name: 'Día 1', uv: 4000, Ingreso: 2400, amt: 2400,
  },
  {
    name: 'Día 2', uv: 3000, Ingreso: 1398, amt: 2210,
  },
  {
    name: 'Día 3', uv: 2000, Ingreso: 9800, amt: 2290,
  },
  {
    name: 'Día 4', uv: 2780, Ingreso: 3908, amt: 2000,
  },
  {
    name: 'Día 5', uv: 1890, Ingreso: 4800, amt: 2181,
  },
  {
    name: 'Día 6', uv: 2390, Ingreso: 3800, amt: 2500,
  },
  {
    name: 'Día 7', uv: 3490, Ingreso: 4300, amt: 2100,
  },
];

export default function Chart() {

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Ganancias</Typography>
        <LineChart
        width={window.screen.width/1.45}
        height={200}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
                   <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Ingreso" stroke="#FF9100" activeDot={{ r: 8 }} />
        </LineChart>
    </React.Fragment>
  );
}