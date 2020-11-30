import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Logo from '../assets/Logo.png'
import { db } from "../firebase"
import Swal from 'sweetalert2'

export default function SignInSide() {

    const [credentials, setCredentials] = useState({});
    const [userCredentials, setUserCredentials] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if(credentials.password == userCredentials.password && credentials.mail == userCredentials.mail){
            sessionStorage.setItem('tu-chofer-credentials',JSON.stringify(credentials));
            window.location.href = 'inicio'
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Usuario incorrecto',
                text: 'La contraseña o el correo no son correctos',
              })
        }
    }

    const handleChange = (e) => {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        db.collection('Web').doc('credentials').get().then((doc) => {
            if (doc.data())
                setCredentials(doc.data());
        })
    }, [])

    return (
        <Grid container className="root">
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className='backgroundImage' />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className='paper'>
                    <img src={Logo} alt="logo" className="logo" />
                    <Typography component="h1" variant="h5">
                        Iniciar Sesión
          </Typography>
                    <form className='form' onSubmit={handleSubmit}>
                        <TextField
                            autoComplete="off"
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            name="mail"
                            type="email"
                            color="secondary"
                        />
                        <TextField
                            autoComplete="off"
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            color="secondary"
                        />
                       
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className='submit'
                        >
                            Iniciar sesión
            </Button>

                        <Box mt={5}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                {'Derechos reservados © '}
        Tu Chofer
      {' '}
                                {new Date().getFullYear()}
                                {'.'}
                            </Typography>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid >
    );

}

