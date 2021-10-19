import React from 'react';
import Swal from 'sweetalert2'
import Button from '@material-ui/core/Button';
import { db } from '../firebase';

export default function StuckDriverButton({driver}) {

    const showALert = () => {
        Swal.fire({
            title: '¿Destrabar chofer?',
            text: driver.name + " se le reiniciará el servicio actual.",
            icon: 'warning',
            confirmButtonText: 'Sí, destrabar'
        }).then((result) => {
            if (result.isConfirmed) {
                resetDriverRequest();
            }
        })
    }


    const resetDriverRequest = () => {
        db.collection('Drivers').doc(driver.phone).update({
            tripID: {
                serviceAccepted:false,
                serviceFinished:false,
                serviceStarted:false,
                userID:''
            }
        }).then(() => {
            Swal.fire({
                allowOutsideClick: false,
                title: 'Chofer destrabajo',
                text: `Se ha destrabado ${driver.name}.`,
                icon: 'info',
                confirmButtonText: 'Continuar'
            }).then(() => {
                window.location.href = '/choferes'
            })
        })
    }

    return (
        <Button variant="contained" color="primary" className="center" onClick={showALert}>
            Destrabar
        </Button>
    );
}