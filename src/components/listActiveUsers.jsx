import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import RemoveIcon from '@material-ui/icons/Remove';

export default function ListActiveUsers({ usersList,driversList,cancelUserService }) {
   

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className="tableHead">Foto de perfil</TableCell>
                    <TableCell className="tableHead">Nombre</TableCell>
                    <TableCell className="tableHead">Teléfono</TableCell>
                    <TableCell className="tableHead">Estado</TableCell>
                    <TableCell className="tableHead"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {usersList.map((user) =>{
                    var isOnService = false;
                    var isAskingService = false;
                    driversList.forEach(driver => {
                        if(user.phone===driver.tripID.userID){
                            isOnService = true;
                        }else{
                            if(user.tripID.driversList.length>0){
                                isAskingService = true;
                            }
                        }
                    });
                    return(
                    <TableRow key={user.phone} >
                        <TableCell><Avatar src={user.image} alt={user.name} className="user-avatar" /></TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                            {isOnService ? 'En servicio' : isAskingService ? 'Pidiendo servicio...': 'Finalizado'}
                        </TableCell>
                        <TableCell>
                            {<Button variant="contained" color="secondary" onClick={()=>cancelUserService(user)} className="cancel">
                                <RemoveIcon/>
                            </Button>}
                        </TableCell>
                    </TableRow>
                )})}
            </TableBody>
        </Table>
    );
}