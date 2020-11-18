import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

export default function ListDrivers({ usersList }) {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className="tableHead">Foto de perfil</TableCell>
                    <TableCell className="tableHead">Nombre</TableCell>
                    <TableCell className="tableHead">Teléfono</TableCell>
                    <TableCell className="tableHead"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {usersList.map((user) => (
                    <TableRow key={user.phone} >
                        <TableCell><Avatar src={user.image} alt={user.name} className="user-avatar" /></TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                            <Button
                                variant="contained" color="secondary" onClick={() => { }} component={Link} to='usuarios/detalles'>
                                Ver
                             </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}