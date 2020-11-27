import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ChatView from '../components/ChatView';
import MyDrawer from '../components/MyDrawer';
import { db } from "../firebase";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [userType,setUserType] = useState('');
    const [phone,setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        var temp = []
        var data = JSON.parse(localStorage.getItem('tu-chofer-chat'))
        if (data.phone) {
            data.isAccepted && data.isAccepted ?
                db.collection("Drivers").doc( data.phone )
                .onSnapshot(function(doc) {
                    temp = []
                    if (doc.data().isAccepted){
                        doc.data().messages.forEach((m)=>{
                            temp.push(m);
    
                        })
                    }
                    setMessages([...temp]);
                    setUserType('Drivers');
                    setPhone(data.phone)
                    setIsLoading(false);
                }) :
                db.collection("Users").doc( data.phone )
                .onSnapshot(function(doc) {
                    temp =[]
                    doc.data().messages.forEach((m)=>{
                        temp.push(m);
    
                    })
                    setMessages([...temp]);
                    setUserType('Users');
                    setPhone(data.phone)
    
                    setIsLoading(false);
                })
        }
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
                                <CircularProgress color="secondary" className="loading"/> : 
                                <ChatView messages={messages} userType={userType} phone={phone}/>
                            }
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}
