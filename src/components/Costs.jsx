import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2'
import { db } from "../firebase"

export default function Costs({title,price}) {

  const handleClick = ()=>{
    Swal.fire({
      title: title,
      input: 'text',
      showCloseButton: true,
      inputValue:price.toFixed(2),
      text: "Costo = Costo Servicio + (Kilómetro * Costo Kilómetro) + Costo Base + (Minutos * Costo Minuto).",
      confirmButtonText: 'Editar',
      confirmButtonColor: '#2196F3',
    }).then((result) => {
      if (result.isConfirmed) {
        const newValue = parseFloat(result.value);
        if(!isNaN(newValue)){
          Swal.fire({
            title: `¿Cambiar ${title} a $${newValue.toFixed(2)}?`,
            text: `Considera que los cambios realizados podrían alterar bastante los precios. No quisieramos regalar viajes ni cobrar mucho.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#999',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Cambiar'
          }).then(async(result) => {
            if (result.isConfirmed) {
              switch(title){
                case 'Costo base': 
                  await db.collection('Prices').doc('actualPrices').update({
                    'costoBase' : newValue
                  })
                
                break;
                case 'Costo servicio': 
                  await db.collection('Prices').doc('actualPrices').update({
                    'costoServicio' : newValue
                  })
                
                break;
                case 'Costo kilómetro': 
                  await db.collection('Prices').doc('actualPrices').update({
                    'costoKilometro' : newValue
                  })
                
                break;
                case 'Costo minuto': 
                  await db.collection('Prices').doc('actualPrices').update({
                    'costoMinuto' : newValue
                  })
                
                break;
                default:
                  break;
              }
              
              Swal.fire(
                `${title} $${newValue.toFixed(2)}`,
                'Se han guardado los cambios',
                'success'
              ).then(()=>{
                window.location.reload();

              })
             
            }
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor ingresa un número.',
          })
        }
        
      }
    })
  }
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>{title}</Typography>
      <Typography component="p" variant="h4">
        ${price && price.toFixed(2)}
      </Typography>
        <br/>
        <Button
        onClick={handleClick}
        className="link"
        variant="outlined"
        color="primary"
        startIcon={<EditIcon />}
      >
        Editar
      </Button>
    </React.Fragment>
  );
}