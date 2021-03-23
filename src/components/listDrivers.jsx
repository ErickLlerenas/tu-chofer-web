import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';

export default function ListDrivers({driversList}) {

    const saveValuesLocal = (values)=>{
        localStorage.setItem('tu-chofer-driver',JSON.stringify(values))
    }
    
    const saveDataToLocalStorage = (user)=>{
        localStorage.setItem('tu-chofer-chat', JSON.stringify(user))
    }

    return (
        <Table style={{ padding: 10}}>
            <TableHead>
                <TableRow>
                    <TableCell className="tableHead">M</TableCell>
                    <TableCell className="tableHead">Nombre</TableCell>
                    <TableCell className="tableHead">Teléfono</TableCell>
                    <TableCell className="tableHead">Domicilio</TableCell>
                    <TableCell className="tableHead">Marca de coche</TableCell>
                    <TableCell className="tableHead">Modelo de coche</TableCell>
                    <TableCell className="tableHead">Placas</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {driversList.map((driver) => (
                    <TableRow key={driver.phone} >
                        <TableCell>{driver.M ? driver.M:''}</TableCell>
                        <TableCell>{driver.name}</TableCell>
                        <TableCell>{driver.phone}</TableCell>
                        <TableCell>{driver.address}</TableCell>
                        <TableCell>{driver.carName}</TableCell>
                        <TableCell>{driver.carModel}</TableCell>
                        <TableCell>{driver.carPlates}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="secondary" onClick={()=>saveValuesLocal(driver)} component={Link} to="choferes/detalles">
                                Ver
                            </Button>
                        </TableCell>
                        <TableCell>
                            <Button variant="contained" color="secondary" onClick={()=>saveDataToLocalStorage(driver)} component={Link} to="Chat">
                                <SendIcon/>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}