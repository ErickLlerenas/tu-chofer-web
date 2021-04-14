import React from 'react'
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export default function RegisteredUsers({usersList}){
    return <Paper className="paper-table">
    <div>

      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
      >
      Usuarios registrados
      </Typography>
     
      <Typography component="p" variant="h5">
        {usersList.length}
      </Typography>
      </div>

    </Paper>;
}