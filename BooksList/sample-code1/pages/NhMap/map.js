import React from 'react'
import {Button, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import Router from 'next/router'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {GoogleMapExample} from '../PresentationalComponent/GoogleMapWrapper';

function getColor(value) {
  let color = '';
  if (value >= 0.9) {
    color = '#006600';
  } else if (value >= 0.8) {
    color = '#006600';
  } else if (value >= 0.7) {
    color = '#00b300';
  } else if (value >= 0.6) {
    color = '#1aff1a';
  } else if (value >= 0.5) {
    color = '#ffff00';
  } else if (value >= 0.4) {
    color = '#ffa64d';
  } else if (value >= 0.3) {
    color = '#ffa64d';
  } else if (value >= 0.2) {
    color = '#ff4000';
  } else {
    color = '#FF0000';
  }
  return color;
}

class Map extends React.Component {

  state = {
    mapsData: [],
    shelters: [],
    markers: [],
    selectedMarker: null,
    polyGon: [],
    boolWindow: null,
    schoolImage: false
  };

  handleClick = (marker, event) => {
    this.setState({selectedMarker: marker})
  };

  iconBoundary = (selectedMarker) => {
    this.setState({
      polyGon: selectedMarker
    })
  };

  refreshMap(address) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        let that = this;
        that.map.state.map.setCenter({
          lat: latLng.lat,
          lng: latLng.lng
        });
        that.props.addressInfo.setState({
          address,
          lat: latLng.lat,
          lng: latLng.lng
        });
        that.map.state.map.data.forEach(function (feature) {
          that.map.state.map.data.remove(feature);
        });
        let lhpStr = 'NPI';
        if (that.props.addressInfo.state.lhpFactor === 1) {
          lhpStr = 'personal'
        } else if (that.props.addressInfo.state.lhpFactor === 2) {
          lhpStr = 'value'
        } else if (that.props.addressInfo.state.lhpFactor === 3) {
          lhpStr = 'school'
        } else if (that.props.addressInfo.state.lhpFactor === 4) {
          lhpStr = 'crime'
        } else if (that.props.addressInfo.state.lhpFactor === 5) {
          lhpStr = 'walkability'
        } else if (that.props.addressInfo.state.lhpFactor === 6) {
          lhpStr = 'community'
        } else if (that.props.addressInfo.state.lhpFactor === 7) {
          lhpStr = 'curb'
        } else if (that.props.addressInfo.state.lhpFactor === 8) {
          lhpStr = 'others'
        }

        that.map.state.map.data.loadGeoJson('static/json/newSample.json');
        that.map.state.map.data.setStyle(function (feature) {

          let ConVar = feature.getProperty(lhpStr);

          if (that.props.addressInfo.state.lhpFactor === 4) {
            ConVar = 1 - ConVar;
          }

          if (that.props.addressInfo.state.lhpFactor === 3) {

            let data = (that.props.addressInfo.state.hMarkers !== undefined) ? that.props.addressInfo.state.hMarkers : []
            let SData = [];
            let Finala = [];
            if (feature.getProperty('schoolM') !== undefined) {
              that.props.addressInfo.state.sMarkers.map((d) => {
                SData.push(d)
              });
              Finala = data.concat(SData);
              that.setState({
                markers: Finala
              })
            }
          } else {
            if (feature.getProperty('homesM') !== undefined) {
              that.setState({
                markers: (that.props.addressInfo.state.hMarkers !== undefined) ? that.props.addressInfo.state.hMarkers : []
              })
            }
          }
          return {
            fillColor: getColor(ConVar),
            strokeWeight: 1,
            fillOpacity: 0.25,
            zIndex: 1,
            strokeColor: '#FFFFFF'
          }
        });

        that.map.state.map.data.addListener('click', function (event) {
          that.props.addressInfo.selectedNeighbor(that.state.boolWindow, 'N')
        });

        that.map.state.map.data.addListener('mouseover', function (event) {
          let ConVar = event.feature.getProperty('NAME');
          let selectedLT = event.feature.getProperty(lhpStr);
          that.setState({
            boolWindow: {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              name: ConVar,
              vl: lhpStr + ':' + selectedLT,
              all: event.feature.l
            }
          });
          that.map.state.map.data.revertStyle();
          that.map.state.map.data.overrideStyle(event.feature, {
            strokeWeight: 5,
            opacity: 0.25,
            zIndex: 9999,
            strokeColor: '#FFFFFF'
          });
        });

        that.map.state.map.data.addListener('mouseout', function (event) {
          that.setState({boolWindow: null});
          that.map.state.map.data.revertStyle();
        });

        that.map.state.map.data.addListener('dblclick', function (event) {
          Router.push('/DetailsNh');
        })

      })
      .catch(error => {
        console.error('Error', error)
      });
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column id="map">
              <div>
                <GoogleMapExample
                  ref={(c) => {
                    this.map = c;
                  }}
                  data={this}
                  onClick={this.handleClick}
                  containerElement={<div style={{
                    height: this.props.addressInfo.state.mapHeight
                  }}/>}
                  mapElement={<div style={{height: '100%'}}/>}
                />
                {
                  (this.props.addressInfo.state.mapHeight > 10)
                  && <Button style={{position: 'absolute', right: 100, bottom: 10}}>Filter Home</Button>
                }
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

Map.propTypes = {
  addressInfo: PropTypes.any.isRequired
};

export default Map
