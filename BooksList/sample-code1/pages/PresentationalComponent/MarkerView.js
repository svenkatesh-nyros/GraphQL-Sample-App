import React from 'react'
import Router from 'next/router'
import {Grid} from 'semantic-ui-react'
import {InfoWindow, Marker} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import {MarkerWithLabel} from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import millify from 'millify'

let markerStyling = {
  clear: 'both', display: 'inline-block', backgroundColor: '#00921A', fontWeight: '500',
  color: '#FFFFFF', boxShadow: '0 6px 8px 0 rgba(63,63,63,0.11)', borderRadius: '23px',
  padding: '8px 16px', whiteSpace: 'nowrap', width: '160px', textAlign: 'center'
};

export default class MarkerView extends React.Component {

  constructor(props) {
    super(props);
    this.renderInfoWindow = this.renderInfoWindow.bind(this);
  }

  state = {
    selectedMarker: null,
    selectedLable: null,
    selectedId: null
  };

  handleMarker = (selectedMarker, event) => {
    let id = (selectedMarker && selectedMarker.id === undefined) ? selectedMarker.properties.ID : selectedMarker.id
    this.setState({
      selectedId: id,
      selectedMarker
    })
    this.props.data.setState({boolWindow: null})
    if (selectedMarker && selectedMarker.id === undefined) {
      let MarkerPoly = []
      for (let crd of selectedMarker.geometry.coordinates[0]) {
        MarkerPoly.push({
          lat: crd[1],
          lng: crd[0]
        })
      }
      this.props.data.iconBoundary(MarkerPoly)
    }
  };

  clickMarker = (selectedMarker) => {
    this.props.data.setState({
      schoolImage: true
    }, () => {

      let HS = (selectedMarker && selectedMarker.id !== undefined) ? 'H' : 'S';
      this.props.data.props.addressInfo.selectedNeighbor(selectedMarker, HS)
    });
    //
  };

  closeMarker = () => {
    this.setState({
      selectedMarker: null
    });
    this.props.data.setState({
      schoolImage: null
    });
    this.props.data.iconBoundary([]);
    //this.props.data.props.addressInfo.selectedNeighbor(null, null)
  };
  doubleclickMarker = () => {
    Router.push('/DetailsListing');
  };

  onMarkerClustererClick = (markerClusterer) => {
  }

  render() {
    let MarkerConst = [];
    let image, lables, schoolimage;
    schoolimage = {
      url: 'https://www.abm.com/k-12/wp-content/uploads/sites/256/2016/03/School-Icon.png',
      scaledSize: new google.maps.Size(35, 35),
      strokeColor: 'red',
      //scale: 3
    };
    image = {
      url: 'static/images/Price2.png',
      scaledSize: new google.maps.Size(50, 35),
      strokeColor: 'white',
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(50, 35),
      labelOrigin: new google.maps.Point(24, 12)
      //scale: 3
    };

    this.props.markers.map((marker, index) => {
      let lat = (marker && marker.id !== undefined) ? marker.coordinates.latitude : marker.properties.LATITUDE;
      let lng = (marker && marker.id !== undefined) ? marker.coordinates.longitude : marker.properties.LONGITUDE;
      let imageIcon = (marker.geoType === 'listing') ? image : schoolimage;
      lables = {
        text: (marker && marker.id !== undefined) ? '$' + millify(marker.listPrice) : marker.properties.SCHOOLNM,
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold'
      }
      //let id = (marker && marker.id !== undefined) ? marker.id : marker.properties.ID


      MarkerConst.push(
        <Marker
          icon={imageIcon}
          label={lables}
          key={(marker && marker.id !== undefined) ? marker.id : marker.properties.ID}
          onMouseOver={(e) => this.handleMarker(marker, e)}
          onMouseOut={() => this.closeMarker()}
          onDblClick={() => this.doubleclickMarker()}
          position={{
            'lat': lat,
            'lng': lng
          }}
          onClick={() => this.clickMarker(marker)}>
          {

            this.state.selectedMarker !== null &&
            this.state.selectedId === ((marker && marker.id !== undefined) ? marker.id : marker.properties.ID) &&
            this.props.data.state.boolWindow === null &&
            <InfoWindow key={(marker && marker.id !== undefined) ? marker.id : marker.properties.ID}>
              {this.renderInfoWindow(marker)}
            </InfoWindow>}
        </Marker>
      )
    });
    return <MarkerClusterer
      onClick={this.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      minimumClusterSize={4}
      gridSize={60}
    >{MarkerConst}</MarkerClusterer>
  }

  renderInfoWindow(marker) {

    switch (marker.geoType) {
    case 'school':
      return (
        <Grid centered>
          <Grid.Column>
            <div>
              {`NAME: ${marker.properties.SCHOOLNM}`}
            </div>
            <div>
              {`DISTRICT: ${marker.properties.DISTRICTNM || ''}`}
            </div>
            <div>
              {`GRADES: ${marker.properties.GRADELOW} - ${marker.properties.GRADEHIGH}`}
            </div>
            <div>
              {'Rating: ' + marker.properties.RATING}
            </div>
          </Grid.Column>
        </Grid>
      );
      break;
    case 'listing':
      return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div>
            {`Price: $${millify(marker.listPrice)}`}
          </div>
          <div>
            {`Beds: ${marker.beds || 0}`}
          </div>
          <div>
            {`Baths: ${marker.baths ? marker.baths['total'] : 0}`}
          </div>
          <div style={{
            backgroundImage: `url(${marker.images ? marker.images[0] : ''})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: marker.images ? 120 : 0,
            width: marker.images ? 150 : 0
          }}>
          </div>
        </div>
      );
      break;
    }
  }
}
