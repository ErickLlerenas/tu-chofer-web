import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListUsers from '../components/listUsers';
import MyDrawer from '../components/MyDrawer';
import { db } from "../firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersSlash } from '@fortawesome/free-solid-svg-icons'

export default function Users() {
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        var temp = [];
        db.collection('Users').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                temp.push(doc.data());
            })
            setUsersList([...temp]);
            setIsLoading(false);
        })
    }, []);
    return (
        <div className="flex">
            <CssBaseline />
            <MyDrawer index={4} />
            <main className="drawer-content">
                <Container maxWidth="lg" className='container'>
                    <h2>Usuarios</h2>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {isLoading ?
                                <CircularProgress color="secondary" className="loading"/>
                                : usersList.length!=0 ? <Paper className='paper-table'>
                                    <ListUsers usersList={usersList} />
                                </Paper>: <div className="empty">
                                <FontAwesomeIcon icon={faUsersSlash} className="empty-icon"/><br />
                    <h2 className="center">No hay usuarios registrados...</h2>
                  </div>}
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}