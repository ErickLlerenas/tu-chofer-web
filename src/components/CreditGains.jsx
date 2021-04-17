import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Swal from "sweetalert2";
import { db } from "../firebase";

export default function CreditGains({creditGains,total,driverPhone}){

    const showConfirmAlert = () => {
        Swal.fire({
          icon: "question",
          title: "¿Marcar todo como pagado?",
          html: "Se marcarán todos los pagos con tarjeta como pagados.",
          confirmButtonText: "Confirmar"
    
        }).then((value) => {
          if (value.isConfirmed)
            handleConfirmed();
        });
      }

      const handleConfirmed =async() =>{
        await updatePayedToDB();
        showSuccessAlert();
      }

      const updatePayedToDB = async()=>{ 
        var driverSnapshot = await db.collection('Drivers').doc(driverPhone).get();
        var selectedHistory = [...driverSnapshot.data().history];


        selectedHistory.forEach((_,i)=>{
          if(selectedHistory[i].payedWithCard)
            selectedHistory[i].cardPaymentComplete = true;
        })
  
        await db.collection('Drivers').doc(driverPhone).update({
            history: selectedHistory
        });
    }

      const showSuccessAlert = ()=>{
        Swal.fire(
            'Pagado',
            'Se han marcado como pagado todos los pagos correctamente',
            'success'
          ).then(()=>{
            window.location.reload();
          });
      }
    return (
        <Paper className="dashboard-paper">
        <Typography component="h2" variant="h6" color="primary" gutterBottom>Tarjeta</Typography>
        <Typography component="p" variant="h4">
          ${creditGains.toFixed(2)}
        </Typography>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>Efectivo</Typography>
        <Typography component="p" variant="h4">
          ${(total - creditGains).toFixed(2)}
        </Typography>
        <br/><br/>
        <Button
        onClick={showConfirmAlert}
        className="link"
        variant="outlined"
        color="primary"
      >
        Marcar pagado
      </Button>

      </Paper>
    );
}