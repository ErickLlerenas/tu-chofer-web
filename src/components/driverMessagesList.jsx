import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

export default function DriverMessages({ messages }) {

    const saveDataToLocalStorage = (user) => {
        localStorage.setItem('tu-chofer-chat', JSON.stringify(user))
    }

    return (
        <Table>
            <span>Choferes</span>
            <TableBody>
                {messages.map((user, i) =>{
                    var date = user.messages && user.messages[user.messages.length - 1].time;
                    return(
                    <TableRow key={i} onClick={() => { saveDataToLocalStorage(user) }} component={Link} to='/Chat' style={{textDecoration:'none'}}>
                        <TableCell align="center"><Avatar src={user.image} alt={user.name} className="user-avatar" /></TableCell>
                        <TableCell><b id="bold">M: {user.M && user.M}<br/> {user.name}</b><br />{user.messages && user.messages[user.messages.length - 1].message}</TableCell>
                        <TableCell>
                            {date.toDate().getDate()}/{date.toDate().getMonth()+1}/{date.toDate().getFullYear()}<br/> {date.toDate().getHours()}:{date.toDate().getMinutes()}
                        </TableCell>
                    </TableRow>
                )})}
            </TableBody>
        </Table>
    );
}