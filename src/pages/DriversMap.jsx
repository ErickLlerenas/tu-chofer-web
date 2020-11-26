import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ListDrivers from '../components/listDrivers';
import MyDrawer from '../components/MyDrawer';
import { db } from "../firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersSlash } from '@fortawesome/free-solid-svg-icons'
import { GoogleMap, LoadScript,Marker  } from '@react-google-maps/api';

export default function DriversMap() {
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mapColorStyle = [ { "featureType": "all", "elementType": "labels.text.fill", "stylers": [ { "color": "#7c93a3" }, { "lightness": "-10" } ] }, { "featureType": "administrative.country", "elementType": "geometry", "stylers": [ { "visibility": "on" } ] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "color": "#a0a4a5" } ] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [ { "color": "#62838e" } ] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "color": "#dde3e3" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [ { "color": "#3f4a51" }, { "weight": "0.30" } ] }, { "featureType": "poi", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "poi.attraction", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "poi.business", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.government", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "poi.place_of_worship", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.school", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.sports_complex", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "all", "stylers": [ { "saturation": "-100" }, { "visibility": "on" } ] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "on" } ] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "color": "#bbcacf" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "lightness": "0" }, { "color": "#bbcacf" }, { "weight": "0.50" } ] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [ { "visibility": "on" } ] }, { "featureType": "road.highway", "elementType": "labels.text", "stylers": [ { "visibility": "on" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [ { "color": "#a9b4b8" } ] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [ { "invert_lightness": true }, { "saturation": "-7" }, { "lightness": "3" }, { "gamma": "1.80" }, { "weight": "0.01" } ] }, { "featureType": "transit", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#a3c7df" } ] } ];

  useEffect(() => {

    db.collection('Drivers').onSnapshot(function(querySnapshot) {
      var temp = [];

      querySnapshot.forEach((doc) => {
        if (doc.data().isAccepted){
          temp.push(doc.data());
        }
         
      })
      setMarkers([...temp]);
      setIsLoading(false);
      console.log(temp)

    })

  }, []);

  const mapStyles = {        
    height: "70vh",
    width: "100%"};
  
  var defaultCenter = {
    lat: 19.2412146, lng: -103.728869
  }
  return (
    <div className="flex">
      <CssBaseline />
      <MyDrawer index={2} />
      <main className="drawer-content">
        <Container maxWidth="lg" className='container'>
          <h2>Mapa</h2>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {isLoading ?
                <CircularProgress color="secondary" className="loading" />
                : <LoadScript
                googleMapsApiKey='AIzaSyDyrff9_s1wLUg7OOnH1zSiDhc9ewGXbIw'>
                 <GoogleMap
                  
                  options={{
                    styles:mapColorStyle
                  }}
                   mapContainerStyle={mapStyles}
                   zoom={13}
                   center={defaultCenter}
                 >
                  {markers.length!=0 && markers.map((marker,key)=>(
                     <Marker key={key} position={{
                      lat: marker.currentLocation.w_, lng: marker.currentLocation.T_
                     }} />
                  ))}
                 
                 </GoogleMap>
              </LoadScript>}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
