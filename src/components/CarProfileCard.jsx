import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'

export default function CarProfileCard({ driver }) {

    const showEditALert = () => {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Siguiente',
            showCancelButton: false,
            progressSteps: ['1', '2','3']
        }).queue([
        {
            title: 'Marca del carro',
            inputValue: driver.carName
        },
        {
            title: 'Modelo del carro',
            inputValue: driver.carModel
        },
        {
            title: 'Placas del carro',
            inputValue: driver.carPlates
        }
        ]).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: '¿Guardar?',
                    html: `
              <p><b id="bold">Marca: </b>${result.value[0]}</p>
              <p><b id="bold">Modelo: </b>${result.value[1]}</p>
              <p><b id="bold">Placas: </b>${result.value[2]}</p>

              `,
                    confirmButtonText: 'Guardar'
                }).then((confirm) => {
                    if (confirm.isConfirmed) {
                        db.collection('Drivers').doc(driver.phone).update({
                            carName: result.value[0],
                            carModel: result.value[1],
                            carPlates: result.value[2]
                        }).then(() => {
                            Swal.fire(
                                'Datos guardados',
                                'Se han actualizado los datos',
                                'success'
                            ).then(() => {
                                window.location.reload();

                            })
                        });
                    }
                });
            }
        })
    }

    return (
        <Grid item xs={6} >
            <a href={driver.car} target="_blank" rel="noreferrer">
                <Avatar alt="Remy Sharp" src={driver.car} className="avatar" />
            </a>
            <Card className="request-card" style={{ height: "75%" }}>
                <div className="sizedBox" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {driver.carName}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                            
                        </Typography>
                    <Typography variant="h6" color="textSecondary" component="p">
                        Modelo:<br /> {driver.carModel}
                    </Typography>
                    <br />
                    <Typography variant="h6" color="textSecondary" component="p">
                        Placas:<br /> {driver.carPlates}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={showEditALert} className="margin">
                        Editar
                  </Button>
                </CardContent>
            </Card>
        </Grid>
    );
}