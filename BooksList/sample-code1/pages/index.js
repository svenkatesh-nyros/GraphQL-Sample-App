import React, {Component} from 'react';
import axios from 'axios';
import Router from 'next/router';
import {InText, SearchFeild} from '../components';
import Layout from '../container';
import {LandingFooter, LandingGrids} from './Welcome';
import {gridData} from './Welcome/landingData.json';
import {Divider, Grid, Segment} from 'semantic-ui-react';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      places: []
    };
  }

  onSearch = (e) => {
    let apiKey = 'c5c8f5c57b782e1155b1e542152c8f8ef28be78';
    axios.get('https://api.geocod.io/v1.3/geocode?q=' + encodeURIComponent(e.target.value) + '&api_key=' + encodeURIComponent(apiKey))
      .then((response) => {
        let places = response.data.results;
        this.setState({places});
      })
      .catch(error => {
      });
  };

  onSelect = (e) => {
    // Router.push("/DetailsNh");
    Router.push('/NhMap');
  }


  render() {
    let {places} = this.state;
    return (
      <Layout>
        <Segment basic textAlign="center" style={{paddingTop: 30}}>
          <InText size="large" name="Find your dream DetailsNh" color="blue"/>
          <Divider hidden/>
          <Divider hidden/>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column width={4}/>
              <Grid.Column width={8}>
                <SearchFeild size="huge"
                  find={this.onSearch}
                  results={places}
                  resultClick={this.onSelect}/>
              </Grid.Column>
              <Grid.Column width={4}/>

            </Grid.Row>
          </Grid>
          <Divider hidden/>
          <Divider hidden/>
          <LandingGrids gridData={gridData}/>
        </Segment>
        <Divider hidden/>
        <Divider hidden/>
        <LandingFooter/>

      </Layout>);
  }
}


export default LandingPage;
