import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MessageIcon from '@material-ui/icons/Message';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

export default function ItemList({ index }) {
  return (
    <div>

      <Link to="/inicio" className="white link">
        <ListItem button className="listItem" style={index === 0 ? { backgroundColor: '#ff9100' } : {}}>
          <ListItemIcon>
            <DashboardIcon className="white" />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
      </Link>
      <Link to="/servicio" className="white link">

      <ListItem button className="listItem" style={index === 1 ? { backgroundColor: '#ff9100' } : {}}>
        <ListItemIcon>
          <LocalTaxiIcon className="white" />
        </ListItemIcon>
        <ListItemText primary="Servicio" />
      </ListItem>
      </Link>
      <Link to="/mapa" className="white link">

        <ListItem button className="listItem" style={index === 2 ? { backgroundColor: '#ff9100' } : {}}>
          <ListItemIcon>
            <LocationOnIcon className="white" />
          </ListItemIcon>
          <ListItemText primary="Mapa" />
        </ListItem>
      </Link>
      <Link to="/choferes" className="white link">
        <ListItem button className="listItem" style={index === 3 ? { backgroundColor: '#ff9100' } : {}}>
          <ListItemIcon>
            <PersonIcon className="white" />
          </ListItemIcon>
          <ListItemText primary="Choferes" />
        </ListItem>
      </Link>
      <Link to="/usuarios" className="white link">
        <ListItem button className="listItem" style={index === 4 ? { backgroundColor: '#ff9100' } : {}}>
          <ListItemIcon>
            <PersonIcon className="white" />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>
      </Link>
      <Link to="/solicitudes" className="white link">
        <ListItem button className="listItem" style={index === 5 ? { backgroundColor: '#ff9100' } : {}}>
          <ListItemIcon>
            <NotificationsIcon className="white" />
          </ListItemIcon>
          <ListItemText primary="Solicitudes" />
        </ListItem>
      </Link>

      <Link to="/mensajes" className="white link">
        <ListItem button className="listItem" style={index === 6 ? { backgroundColor: '#ff9100' } : {}}>
          <ListItemIcon>
            <MessageIcon className="white" />
          </ListItemIcon>
          <ListItemText primary="Mensajes" />
        </ListItem>
      </Link>
      <Link to="/salir" className="white link">
        <ListItem button className="listItem" style={index === 7 ? { backgroundColor: '#ff9100' } : {}}>
          <ListItemIcon>
            <ExitToAppIcon className="white" />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItem>
      </Link>
    </div>
  );
}
