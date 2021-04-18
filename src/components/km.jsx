import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import Swal from "sweetalert2";
import { db } from "../firebase";

export default function Km({ title, price }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    Swal.fire({
      title: title,
      input: "text",
      showCloseButton: true,
      inputValue: price.toFixed(2),
      text:
        "Cantidad de kilómetros recorridos desde que empezará a contar los precios del viaje.",
      confirmButtonText: "Editar",
      confirmButtonColor: "#2196F3",
    }).then((result) => {
      if (result.isConfirmed) {
        const newValue = parseFloat(result.value);
        if (!isNaN(newValue)) {
          Swal.fire({
            title: `¿Cambiar ${title} a ${newValue.toFixed(2)} KM?`,
            text: `Se cambiarán los kilómetros de ${price} KM a ${newValue} KM`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#999",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Cambiar",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await db.collection("Prices").doc("actualPrices").update({
                minKM: newValue,
              });

              Swal.fire(
                `${title} ${newValue.toFixed(2)} KM`,
                "Se han guardado los cambios",
                "success"
              ).then(() => {
                window.location.reload();
              });
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor ingresa un número.",
          });
        }
      }
    });
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Kilómetros mínimos
      </Typography>
      {!isLoading ? (
        <div>
          <Typography component="p" variant="h4">
            {price} KM
          </Typography>
          <br />

          <Button
            onClick={handleClick}
            className="link"
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
          >
            Editar
          </Button>
        </div>
      ) : (
        <CircularProgress />
      )}
    </React.Fragment>
  );
}
