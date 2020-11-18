import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

export default function ListRequests({requestsList}) {

    const saveValuesLocal = (values)=>{
        localStorage.setItem('tu-chofer-driver-request',JSON.stringify(values))
    }
    return (
        <Table style={{ padding: 10 }}>
            <TableHead>
                <TableRow>
                    <TableCell className="tableHead">Nombre</TableCell>
                    <TableCell className="tableHead">Teléfono</TableCell>
                    <TableCell className="tableHead">Domicilio</TableCell>
                    <TableCell className="tableHead">Marca de coche</TableCell>
                    <TableCell className="tableHead">Modelo de coche</TableCell>
                    <TableCell className="tableHead">Placas</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {requestsList.map((driver) => (
                    <TableRow key={driver.phone} >
                        <TableCell>{driver.name}</TableCell>
                        <TableCell>{driver.phone}</TableCell>
                        <TableCell>{driver.address}</TableCell>
                        <TableCell>{driver.carName}</TableCell>
                        <TableCell>{driver.carModel}</TableCell>
                        <TableCell>{driver.carPlates}</TableCell>
                        <TableCell><Button variant="contained" color="secondary" onClick={()=>saveValuesLocal(driver)} component={Link} to="/solicitudes/detalles">
                            Ver
      </Button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}