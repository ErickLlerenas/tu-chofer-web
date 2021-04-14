import React from 'react';
import { KeyboardDatePicker , MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

export default function DatePickers({dates,setDates}) {

    const handleStartDate = (date)=>{
        setDates({
            ...dates,
            startDate:moment(date)
        })
    }

    const handleEndDate = (date)=>{
        setDates({
            ...dates,
            endDate:moment(date)
        })
    }


    return (
        <Paper style={{marginTop:20,marginBottom:20,padding:30}}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Fechas</Typography>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around" >
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-start"
                    label="Inicio"
                    format="MM/dd/yyyy"
                    value={dates.startDate}
                    onChange={handleStartDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-end"
                    label="Fin"
                    format="MM/dd/yyyy"
                    value={dates.endDate}
                    onChange={handleEndDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
        </Paper>
    );
}