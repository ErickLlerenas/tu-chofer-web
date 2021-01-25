import React from 'react';
import { KeyboardDatePicker , MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function DatePickers() {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

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
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-end"
                    label="Fin"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
        </Paper>
    );
}