import React from "react";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Grid from "@material-ui/core/Grid";
import Swal from "sweetalert2";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HistoryItem({ h , i , driverPhone }) {
  const classes = useStyles();


  const showConfirmAlert = (money) => {
    Swal.fire({
      icon: "question",
      title: "¿Marcar como pagado?",
      html: "He pagado al chofer sus $" + money + " pesos.",
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
      selectedHistory[i].cardPaymentComplete = true;

      await db.collection('Drivers').doc(driverPhone).update({
          history: selectedHistory
      });
  }

  const showSuccessAlert = ()=>{
    Swal.fire(
        'Pagado',
        'Se ha marcado como pagado correctamente',
        'success'
      ).then(()=>{
        window.location.reload();
      });
  }

  return (
    <Grid item xs={4}>
      <Paper
      onClick={ ()=>{
        if(h.payedWithCard && h.payedWithCard)
          showConfirmAlert(h.cost)
        }}
        style={
            !h.cardPaymentComplete && h.payedWithCard
            ? { backgroundColor: "#CBE5FF", height: "100%" }
            : h.cardPaymentComplete && { backgroundColor: "#DDD",height: "100%" }
        }
      >
        <List component="nav" className={classes.root} aria-label="contacts"  style={
          !h.cardPaymentComplete && h.payedWithCard
            ? { backgroundColor: "#CBE5FF" }:h.cardPaymentComplete && { backgroundColor: "#DDD" }}
            
        >
          <ListItem>
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
            <ListItemText
              primary="Fecha y hora:"
              secondary={
                h.date.toDate().toLocaleDateString() +
                " " +
                h.date.toDate().getHours() +
                ":" +
                h.date.toDate().getMinutes()
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon style={{ color: "#2196F3" }}>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Origen:" secondary={h.origin} />
          </ListItem>
          <ListItem>
            <ListItemIcon style={{ color: "#ff1744" }}>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Destino:" secondary={h.destination} />
          </ListItem>
          <ListItem>
            <ListItemIcon style={{ color: "#1b8f7d" }}>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Costo:" secondary={"$" + h.cost} />
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
}
