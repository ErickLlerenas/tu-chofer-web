import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

export default function ListUsers({ usersList ,ranked,search}) {

    const saveValuesLocally = (values)=>{
        localStorage.setItem('tu-chofer-user',JSON.stringify(values))
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className="tableHead">Foto de perfil</TableCell>
                    <TableCell className="tableHead">Nombre</TableCell>
                    <TableCell className="tableHead">Teléfono</TableCell>
                    <TableCell className="tableHead">Viajes realizados</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {usersList.filter((user)=>{
                    if(search===""){
                        return user
                    }else if(user.phone.includes(search)){
                        return user
                    }
                    else if(search==null) return user;
                }).map((user,index) => (
                    <TableRow key={user.phone} >
                        <TableCell>
                            { ranked && index<3 && <EmojiEventsIcon style={index===0?{color:'#FFC300'}:index===1?{color:'#5F6A6A'}:{color:'#BA4A00'}}/>}
                            <Avatar src={user.image} alt={user.name} className="user-avatar" />
                            </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.history.length}</TableCell>

                        <TableCell>
                            <Button
                                variant="contained" color="secondary" onClick={() => saveValuesLocally(user)} component={Link} to='usuarios/detalles'>
                                Ver
                             </Button>
                        </TableCell>
                       
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}