import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListChats from '../components/listChats';
import MyDrawer from '../components/MyDrawer';
import { db } from "../firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersSlash } from '@fortawesome/free-solid-svg-icons'

export default function Chats() {
    const [chatsList, setChatsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      var temp = [];
  
      db.collection('Drivers').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().isAccepted)
            temp.push(doc.data());
        })
        setChatsList([...temp]);
        setIsLoading(false);
      })
      db.collection('Users').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            temp.push(doc.data());
        })
        setChatsList([...temp]);
        setIsLoading(false);
      })
    }, []);
    return (
        <div className="flex">
            <CssBaseline />
            <MyDrawer index={6} />
            <main className="drawer-content">
                <Container maxWidth="lg" className='container'>
                    <h2>Mensajes</h2>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {isLoading ?
                                <CircularProgress color="secondary" className="loading"/>
                                : chatsList.length!==0 ? <Paper className='paper-table'>
                                    <ListChats chatsList={chatsList} />
                                </Paper>: <div className="empty">
                                <FontAwesomeIcon icon={faUsersSlash} className="empty-icon"/><br/>
                                    <h2 className="center">No hay usuarios registrados...</h2>
                                </div>}
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}
