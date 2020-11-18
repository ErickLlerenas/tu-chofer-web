import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

export default function Costs({title,price}) {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>{title}</Typography>
      <Typography component="p" variant="h4">
        ${price && price.toFixed(2)}
      </Typography>
        <br/>
        <Button
        className="link"
        component={Link}
        to='costos/'
        variant="outlined"
        color="primary"
        startIcon={<EditIcon />}
      >
        Editar
      </Button>
    </React.Fragment>
  );
}