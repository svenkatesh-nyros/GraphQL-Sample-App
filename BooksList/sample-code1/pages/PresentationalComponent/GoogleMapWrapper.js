import {GoogleMap, InfoWindow, Marker, Polygon, withGoogleMap} from 'react-google-maps';
import MarkerView from './MarkerView';
import {Grid} from 'semantic-ui-react'
import React from 'react'

let mapOptions = {
  zoomControlOptions: {
    //   position: 'RIGHT_CENTER',    // as long as this is not set it works
    style: 'SMALL'
  },
  mapTypeControlOptions: {
    style: 'TINY'    // this makes the map type control disappear
  },
  streetViewControl: false,
  disableDoubleClickZoom: true
};

export const GoogleMapExample = withGoogleMap(props => {
  return (
    <GoogleMap
      options={mapOptions}
      defaultCenter={{lat: props.data.props.addressInfo.state.lat, lng: props.data.props.addressInfo.state.lng}}
      defaultZoom={15}
      editable={true}
      onPolygonComplete={polygon => {
        for (let point of polygon.getPath().getArray()) {
          GeoJSON.geometry.coordinates.push([point.lng(), point.lat()]);
        }
      }}>
      {
        props.data.state.polyGon.length !== 0 && <Polygon
          paths={props.data.state.polyGon}
          options={{
            fillColor: '#5000ff',
            strokeColor: '#5000ff',
            strokeWeight: 1
          }}
        />
      }
      <MarkerView markers={props.data.state.markers} info={props.data.props.addressInfo} data={props.data}/>
      {(props.data.state.boolWindow)
        ? <Marker
          key={12586}
          icon={''}
          visible={false}
          position={{'lat': props.data.state.boolWindow.lat, 'lng': props.data.state.boolWindow.lng}}
        >
          <InfoWindow>
            <Grid>
              <Grid.Column textAlign='center'>
                <div>{props.data.state.boolWindow.name}</div>
                <div>{props.data.state.boolWindow.vl}</div>
              </Grid.Column>
            </Grid>
          </InfoWindow>
        </Marker>
        : null
      }
    </GoogleMap>
  );
});
