import React, {Component} from 'react'
import Map from './map'
import Neighbourhood from './neighbourhood'
import Cities from './cities'
import Homes from './homes'
import Headers from './header'
import {Container, Divider, Grid, Input, Tab} from 'semantic-ui-react'
import PlacesAutocomplete from 'react-places-autocomplete';
import 'isomorphic-fetch'

const LHPpanes = context => {
  return (
    [
      {menuItem: 'NPI', render: () => <Tab.Pane><Map ref={'map'} addressInfo={context}></Map></Tab.Pane>},
      {menuItem: 'Personal', render: () => <Tab.Pane><Map ref={'map'} addressInfo={context}></Map></Tab.Pane>},
      {menuItem: 'Value', render: () => <Tab.Pane><Map ref={'map'} addressInfo={context}></Map></Tab.Pane>},
      {menuItem: 'Schools', render: () => <Tab.Pane><Map ref={'map'} addressInfo={context}></Map></Tab.Pane>},
      {menuItem: 'Crime', render: () => <Tab.Pane><Map ref={'map'} addressInfo={context}></Map></Tab.Pane>},
      {menuItem: 'Walkability', render: () => <Tab.Pane><Map ref={'map'} addressInfo={context}></Map></Tab.Pane>},
      {menuItem: 'Community', render: () => <Tab.Pane><Map ref={'map'} addressInfo={context}></Map></Tab.Pane>},
      {menuItem: 'Curb', render: () => <Tab.Pane><Map ref={'map'} addressInfo={context}></Map></Tab.Pane>},
      {menuItem: 'Others', render: () => <Tab.Pane><Map ref={'map'} addressInfo={context}></Map></Tab.Pane>},
    ]
  )
};

const minLat = 37.6988;
const minLng = -122.34147;
const maxLat = 37.8842;
const maxLng = -122.112033;
const tabPadding = 17.5;

class NhMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lat: 40.756795,
      lng: -73.954298,
      lhpFactor: 0,
      rhpFactor: 1,
      cities: [],
      neighborhood: [],
      selectedNeighbour: false,
      homes: [],
      height: 0,
      mapHeight: 0,
      hMarkers: [],
      sMarkers: [],
      schoolBool: false

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.detectHeight = this.detectHeight.bind(this);

    this.renderData(this.state.lhpFactor, 1);
  }

  componentDidMount() {
    this.detectHeight()
    window.onresize = this.detectHeight
    this.renderData(0, 0)
  }

  detectHeight() {
    this.setState({
      height: window.innerHeight - 40 - 102 - 28 - 84,
      mapHeight: window.innerHeight - 40 - 102 - 28 - 150
    });
  }

  handleInputChange(event) {
    this.setState({rhpFactor: event})
    this.renderData(this.state.lhpFactor, event)
  }

  handleChanges = address => {
    this.setState({address: address})
  };
  handleSelects = address => {
    this.tabRef.refs.map.refreshMap(address)
  };

  handleChange = (value, data) => {
    this.setState({
      lhpFactor: data.activeIndex
    }, () => {
      this.tabRef.refs.map.refreshMap(this.state.address)
    });
    this.renderData(data.activeIndex, this.state.rhpFactor)
  };

  handleChangeRHP = (value, data) => {
    this.setState({
      rhpFactor: data.activeIndex,
      selectedNeighbour: false
    });
    this.renderData(this.state.lhpFactor, data.activeIndex)
  };
  handleChangeRHP2 = (value, data, datas) => {
    this.setState({
      rhpFactor: data.activeIndex,
      selectedNeighbour: datas
    });
    this.renderData(this.state.lhpFactor, data.activeIndex)
  };


  selectedNeighbor = (value, data) => {
    if (data === 'N') {
      this.handleChangeRHP2(this.state.lhpFactor, {activeIndex: 1}, value)
    } else if (data === 'H') {
      this.handleChangeRHP2(this.state.lhpFactor, {activeIndex: 2}, value)
    } else {
      this.handleChangeRHP2(this.state.lhpFactor, {activeIndex: 0}, value)
    }
  }

  renderData(lhp, rhp) {
    let that = this;
    if (lhp === 3) {
      fetch('static/json/alamedaschools2.geojson').then(function (data) {
        if (that.state.schoolBool === false) {
          data.json().then((res) => {
            that.setState({
              sMarkers: res.features.filter(d => {
                return ((d.properties.LATITUDE > minLat &&
                  d.properties.LATITUDE < maxLat) &&
                  (d.properties.LONGITUDE > minLng &&
                    d.properties.LONGITUDE < maxLng))
              }).map(d => {
                return {
                  geometry: d.geometry,
                  geoType: 'school',
                  properties: {
                    ID: d.properties.ID,
                    GRADEHIGH: d.properties.GRADEHIGH,
                    GRADELOW: d.properties.GRADELOW,
                    LATITUDE: d.properties.LATITUDE,
                    LONGITUDE: d.properties.LONGITUDE,
                    RATING: d.properties.RATING,
                    SCHOOLNM: d.properties.SCHOOLNM,
                    DISTRICTNM: d.properties.DISTRICTNM,
                  }
                };
              }),
              schoolBool: true
            }, () => {
              that.tabRef.refs.map.refreshMap(that.state.address)
            })
          })
        }
      })
    } else if (rhp === 1) {
      fetch('static/json/neighbourhood2.json').then(function (data) {
        data.json().then((res) => {
          that.setState({
            neighborhood: res.data
          })
        })
      })
    } else if (rhp === 2) {
      fetch('static/json/new_home.json').then(function (data) {
        data.json().then((res) => {
          let newRes = res.filter(d => {
            return ((d.coordinates.latitude > minLat &&
              d.coordinates.latitude < maxLat) &&
              (d.coordinates.longitude > minLng &&
                d.coordinates.longitude < maxLng));
          }).map(d => {
            return {
              id: d.id,
              geoType: d.geoType,
              address: d.address,
              area: d.area,
              baths: d.baths,
              beds: d.beds,
              coordinates: d.coordinates,
              county: d.county,
              description: d.description,
              listingType: d.listingType,
              listPrice: d.listPrice,
              propertyType: d.propertyType,
              size: d.size,
              style: d.style,
              yearBuilt: d.yearBuilt,
              xf_squarefootage: d.xf_squarefootage,
              images: d.images
            }
          });
          that.setState({
            neighborhood: res,
            hMarkers: newRes,
            sMarkers: [],
            schoolBool: false
          })
        })
      })
    } else {
      fetch('static/json/new_home.json').then(function (data) {
        data.json().then((res) => {
          let newRes = res.filter(d => {
            return ((d.coordinates.latitude > minLat &&
              d.coordinates.latitude < maxLat) &&
              (d.coordinates.longitude > minLng &&
                d.coordinates.longitude < maxLng));
          }).map(d => {
            return {
              id: d.id,
              geoType: d.geoType,
              address: d.address,
              area: d.area,
              baths: d.baths,
              beds: d.beds,
              coordinates: d.coordinates,
              county: d.county,
              description: d.description,
              listingType: d.listingType,
              listPrice: d.listPrice,
              propertyType: d.propertyType,
              size: d.size,
              style: d.style,
              yearBuilt: d.yearBuilt,
              xf_squarefootage: d.xf_squarefootage,
              images: d.images
            }
          });
          that.setState({
            neighborhood: res,
            hMarkers: newRes,
            sMarkers: [],
            schoolBool: false
          })
        })
      })
    }
  }

  render() {
    return (
      <Container fluid>
        <Headers/>
        <Divider/>
        <Grid divided>
          <Grid.Column width={11}>
            <Grid.Row style={{padding: '0rem 0rem 1rem 0rem !important'}}>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChanges}
                onSelect={this.handleSelects}
              >
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                  <div>
                    <div className='ui input' style={{width: '100%'}}>
                      <Input type='text' icon='search' iconPosition='left' style={{width: '100%'}}
                        size='large'
                        placeholder='Search...' {...getInputProps({
                          placeholder: 'Search Places ...',
                          className: 'location-search-input',
                        })}/>
                    </div>
                    <div className="autocomplete-dropdown-container" style={{
                      paddingLeft: '16px',
                      width: '97%',
                      position: 'absolute',
                      zIndex: 999,
                      backgroundColor: '#ffffff'
                    }}>
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        const style = suggestion.active
                          ? {backgroundColor: '#fafafa', cursor: 'pointer', paddingTop: '5px'}
                          : {backgroundColor: '#ffffff', cursor: 'pointer', paddingTop: '5px'};
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          ><span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </Grid.Row>
            <Grid.Row style={{flex: 1}}>
              <Tab ref={(c => {
                this.tabRef = c;
                console.log(this.tabRef);
              })} onTabChange={this.handleChange} menu={{pointing: true, className: 'wrapped'}}
              panes={LHPpanes(this)}/>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={5}>
            <Tab onTabChange={this.handleChangeRHP} menu={{pointing: true, className: 'wrapped'}} panes={[
              {
                menuItem: 'Cities',
                render: () => <Tab.Pane
                  style={{overflowY: 'scroll', height: this.state.height + tabPadding}}><Cities
                    data={this.state.cities}></Cities></Tab.Pane>
              },
              {
                menuItem: 'Neightborhood',
                render: () => <Tab.Pane
                  style={{overflowY: 'scroll', height: this.state.height + tabPadding}}><Neighbourhood
                    data={this.state.neighborhood}
                    selectedData={this.state.selectedNeighbour}></Neighbourhood></Tab.Pane>
              },
              {
                menuItem: 'Home',
                render: () => <Tab.Pane
                  style={{overflowY: 'scroll', height: this.state.height + tabPadding}}><Homes
                    data={this.state.neighborhood}
                    selectedData={this.state.selectedNeighbour}></Homes></Tab.Pane>
              },
            ]} activeIndex={this.state.rhpFactor}/>
          </Grid.Column>
        </Grid>
      </Container>


    );
  }
}

export default NhMap;
