import React, { useState, useEffect, useRef } from 'react';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { db } from "../firebase"

export default function ChatView({ messages, userType, phone }) {

    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message !== undefined && message.length > 0) {
            db.collection(userType).doc(phone).get().then((m) => {
                let temp = [...m.data().messages];
                temp.push({
                    name:'Tu Chofer',
                    message: message
                })
                db.collection(userType).doc(phone).update({
                    messages: temp
                })
            });

            setMessage('')
        }
    }

    return (
        <Container>
            <Container className="scrollable">
                {
                    messages.map((m, key) => (
                        m.name === "Tu Chofer" ?
                            <Paper key={key} className="chofer-msg">
                                <p className="name-msg">{m.name}</p>
                                {m.message}
                            </Paper> :
                            <Paper key={key} className="user-msg">
                                <p className="name-msg">{m.name}</p>
                                {m.message}
                                <p className="time-msg">{m.time.toDate().getHours()}:{m.time.toDate().getMinutes()}</p>
                            </Paper>
                    ))
                }
                <div ref={messagesEndRef}/>
            </Container>
           <form onSubmit={handleSubmit}>
           <br />
            <Grid container spacing={2}>
                <Grid item xs={11}>
                    <TextField
                        value={message}
                        autoComplete="off"
                        onChange={handleChange}
                        id="outlined-basic" variant="outlined" style={{ backgroundColor: 'white', width: '100%' }} />

                </Grid>
                <Grid item xs={1}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="send-btn"
                        endIcon={<Icon>send</Icon>}
                    >

                    </Button>
                </Grid>
            </Grid>

           </form>
        </Container>
    );
}