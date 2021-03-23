import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListActiveUsers from '../components/listActiveUsers';
import MyDrawer from '../components/MyDrawer';
import { db } from "../firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersSlash } from '@fortawesome/free-solid-svg-icons'

export default function ActiveUsers() {
    const [usersList, setUsersList] = useState([]);
    const [driversList, setDriversList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const cancelUserService = (user)=>{
        db.collection('Users').doc(user.phone).update({
            tripID:{
                driversList:[],
                isAskingService:false
            }
        })
    }

    useEffect(() => {
        getUsersActiveList();
    }, []);

    const getUsersActiveList = ()=>{
        db.collection('Users').onSnapshot((querySnapshot) => {
            var temp = [];
            querySnapshot.forEach((doc) => {
                if(doc.data().tripID && doc.data().tripID.isAskingService){
                    temp.push(doc.data());
                }
                
            })
            setUsersList([...temp]);
            setIsLoading(false);
        })            
    }

    useEffect(() => {
        db.collection('Drivers').onSnapshot((querySnapshot) => {
            var temp = [];
            querySnapshot.forEach((doc) => {
                if(doc.data().tripID && doc.data().tripID.serviceAccepted){
                    temp.push(doc.data());
                    console.log(doc.data().tripID);
                }
                
            })
            setDriversList([...temp]);
        })
    }, []);
    return (
        <div className="flex">
            <CssBaseline />
            <MyDrawer index={5} />
            <main className="drawer-content">
                <Container maxWidth="lg" className='container'>
                    <h2>Usuarios</h2>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {isLoading ?
                                <CircularProgress color="secondary" className="loading"/>
                                : usersList.length!==0 ? <Paper className='paper-table'>
                                    <ListActiveUsers usersList={usersList} driversList={driversList} cancelUserService={cancelUserService}/>
                                </Paper>: <div className="empty">
                                <FontAwesomeIcon icon={faUsersSlash} className="empty-icon"/><br />
                    <h2 className="center">No hay usuarios activos...</h2>
                  </div>}
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}