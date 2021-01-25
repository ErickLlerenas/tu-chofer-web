import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UserMessagesList from '../components/userMessagesList';
import MyDrawer from '../components/MyDrawer';
import { db } from "../firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons'
import DriverMessages from '../components/driverMessagesList';

export default function Messages() {

    const [userMessages, setUserMessages] = useState([]);
    const [driverMessages, setDriverMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkIfNewMessage();
    }, []);

    const checkIfNewMessage = async() => {
        await checkUserMessages();
        await checkDriverMessages();
        setIsLoading(false)
    }

    const checkUserMessages = async () => {
        let temp = [];
        const users = await db.collection('Users').get();
        users.forEach((user) => {
            if (user.data().messages[user.data().messages.length - 1].name !== "Tu Chofer") {
                temp.push(user.data())
            }
        })
        setUserMessages(temp);
    }

    const checkDriverMessages = async () => {
        let temp = []
        const drivers = await db.collection('Drivers').get();
        drivers.forEach((driver) => {
            if (driver.data().messages[driver.data().messages.length - 1].name !== "Tu Chofer") {
                temp.push(driver.data());
            }
        })
        setDriverMessages(temp);
    }
    return (
        <div className="flex">
            <CssBaseline />
            <MyDrawer index={7} />
            <main className="drawer-content">
                <Container maxWidth="lg" className='container'>
                    <h2 >Mensajes</h2>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            {isLoading ?
                                <CircularProgress color="secondary" className="loading" />
                                : userMessages.length !== 0 ? <Paper className='paper-table'>
                                    <UserMessagesList messages={userMessages} />
                                </Paper> : <div className="empty">
                                        <FontAwesomeIcon icon={faCommentSlash} className="empty-icon" /><br />
                                        <h2 className="center">No hay nuevos mensajes...</h2>
                                    </div>}
                        </Grid>
                        <Grid item xs={6}>
                            {isLoading ?
                                <CircularProgress color="secondary" className="loading" />
                                : driverMessages.length !== 0 ? <Paper className='paper-table'>
                                    <DriverMessages messages={driverMessages} />
                                </Paper> : <div className="empty">
                                        <FontAwesomeIcon icon={faCommentSlash} className="empty-icon" /><br />
                                        <h2 className="center">No hay nuevos mensajes...</h2>
                                    </div>}
                        </Grid>
                    </Grid>
                </Container>
            </main>


        </div>
    );
}
