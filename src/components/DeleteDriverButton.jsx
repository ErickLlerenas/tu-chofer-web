import React from 'react';
import Swal from 'sweetalert2'
import Button from '@material-ui/core/Button';
import { db } from '../firebase';

export default function DeleteDriverButton({driver}) {

    const showALert = () => {
        Swal.fire({
            title: '¿Eliminar chofer?',
            text: driver.name + " será dado de baja.\n Volverá a ser un usuario pendiente de ser aceptado como chofer.",
            icon: 'warning',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                cancelDriverRequest();
            }
        })
    }


    const cancelDriverRequest = () => {
        db.collection('Drivers').doc(driver.phone).update({
            isAccepted: false
        }).then(() => {
            Swal.fire({
                allowOutsideClick: false,
                title: 'Chofer eliminado',
                text: `Se ha dado de baja a ${driver.name}.`,
                icon: 'info',
                confirmButtonText: 'Continuar'
            }).then(() => {
                window.location.href = '/choferes'
            })
        })
    }

    return (
        <Button variant="contained" color="primary" className="center cancel" onClick={showALert}>
            Bye bye chofer
        </Button>
    );
}