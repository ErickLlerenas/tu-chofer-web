import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

export default function ListChats({ chatsList }) {

    const saveDataToLocalStorage = (user)=>{
        localStorage.setItem('tu-chofer-chat', JSON.stringify(user))
    }

    return (
        <Table>
            <TableBody>
                {chatsList.map((user,i) => (
                    <TableRow key={i} style={user.isAccepted ? {backgroundColor: '#fff1d0'} : {}}>
                        <TableCell align="center"><Avatar src={user.image} alt={user.name} className="user-avatar"/></TableCell>
                        <TableCell>{user.name}<br/>{user.phone}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="secondary" onClick={() => { saveDataToLocalStorage(user)}} component={Link} to='/Chat'>
                                Mensajear
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}