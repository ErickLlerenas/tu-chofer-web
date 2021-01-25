import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MyDrawer from '../components/MyDrawer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SignOutIcon from '../assets/signout.png'

export default function SignOut() {

    const checkIfLogedIn = ()=>{
        const credentials = JSON.parse(sessionStorage.getItem('tu-chofer-credentials'));
        if(credentials==null)
          window.location.href = "/"
        
      }
    const handleClick = ()=>{
        localStorage.removeItem("tu-chofer-credentials")
        checkIfLogedIn();
    }

    return (
        <div className="flex">
            <CssBaseline />
            <MyDrawer index={8} />
            <main className="drawer-content">
                <Container maxWidth="lg" className='container details-container'>
                    <h2>Salir</h2>
                    <Grid container spacing={3} justify="center">

                        <Grid item xs={6}>
                            <div className="sizedBox"></div>
                            <Card className="request-card">
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        ¿Quieres salir?
                  </Typography>
                                    <img src={SignOutIcon} alt="Log Out" className="signout-icon"/>
                                    <Button variant="contained" color="secondary" onClick={handleClick}>
                                        Salir
</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                </Container>
            </main>
        </div>
    );
}