import React from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function HistoryItem({history}) {
    const classes = useStyles();

    return (
        <Grid item xs={4}>
            <Paper style={{ height: "100%" }}>
                <List component="nav" className={classes.root} aria-label="contacts">
                    <ListItem>
                        <ListItemIcon>
                            <DateRangeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Fecha y hora:" secondary={history.date.toDate().toLocaleDateString() + ' ' + history.date.toDate().getHours() + ':' + history.date.toDate().getMinutes()} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon style={{ color: "#2196F3" }}>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Origen:" secondary={history.origin} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon style={{ color: "#ff1744" }}>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Destino:" secondary={history.destination} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon style={{ color: "#1b8f7d" }}>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Costo:" secondary={"$" + history.cost} />
                    </ListItem>
                </List>
            </Paper>
        </Grid>
    );
}