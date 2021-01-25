import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'

export default function DriverProfileCard({driver}) {

    const showEditALert = () => {
        Swal.mixin({
          input: 'text',
          confirmButtonText: 'Siguiente',
          showCancelButton: false,
          progressSteps: ['1', '2', '3']
        }).queue([{
          title: 'M',
          inputValue: driver.M ? driver.M : ''
        },
        {
          title: 'Nombre',
          inputValue: driver.name
        },
        {
          title: 'Domicilio',
          inputValue: driver.address
        }
        ]).then((result) => {
          if (result.value) {
            Swal.fire({
              title: '¿Guardar?',
              html: `
              <p><b id="bold">M: </b>${result.value[0]}</p>
              <p><b id="bold">Nombre: </b>${result.value[1]}</p>
              <p><b id="bold">Domicilio: </b>${result.value[2]}</p>
              `,
              confirmButtonText: 'Guardar'
            }).then((confirm) => {
              if (confirm.isConfirmed) {
                db.collection('Drivers').doc(driver.phone).update({
                  M: result.value[0],
                  name: result.value[1],
                  address: result.value[2]
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
            <a href={driver.image} target="_blank" rel="noreferrer">
                <Avatar alt="Remy Sharp" src={driver.image} className="avatar" />
            </a>
            <Card className="request-card" style={{ height: "75%" }}>
                <div className="sizedBox" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {driver.name}
                    </Typography>
                    {driver.M &&
                        <Typography gutterBottom variant="h5" component="h2">
                            {driver.M}
                        </Typography>}
                    <Typography variant="h6" color="textSecondary" component="p">
                        Teléfono:<br /> {driver.phone}
                    </Typography>
                    <br />
                    <Typography variant="h6" color="textSecondary" component="p">
                        Domicilio:<br /> {driver.address}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={showEditALert} className="margin">
                        Editar
                  </Button>
                </CardContent>
            </Card>
        </Grid>
    );
}