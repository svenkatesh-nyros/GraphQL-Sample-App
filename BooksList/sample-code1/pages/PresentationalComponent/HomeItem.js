import React from 'react';
import {Grid, Image, Item} from 'semantic-ui-react'
import millify from 'millify'

export default class HomeItem extends React.Component {

  render() {
    const {images, listPrice, beds, baths, xf_squarefootage, address} = this.props.item;
    let street = '', city = '', state = '', zip = '';

    if (this.props.item.hasOwnProperty('address')) {
      street = address.street;
      city = address.city;
      state = address.state;
      zip = address.zip;
    }

    return (
      <Item>
        <div className="ui fluid image">
          <Image style={{height: 200}} src={(images !== undefined) ? images[0] : 'static/images/Neighborhood1.jpg'}/>
          <div style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 'auto',
            color: 'white',
            opacity: 0.6,
            backgroundColor: 'black'
          }}>
            <Grid style={{padding: 10}}>
              <Grid.Column width={9}>
                <Grid.Row>${millify(listPrice)}</Grid.Row>
                <Grid.Row>{street}</Grid.Row>
                <Grid.Row>{city}, {state} {zip}</Grid.Row>
              </Grid.Column>
              <Grid.Column width={7}>
                <Grid divided style={{padding: 10, textAlign: 'center'}}>
                  <Grid.Column width={5}>
                    <Grid.Row>{(beds !== undefined) ? beds : ''}</Grid.Row>
                    <Grid.Row>Beds</Grid.Row>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Grid.Row>{(baths !== undefined) ? baths.total : ''}</Grid.Row>
                    <Grid.Row>Baths</Grid.Row>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Grid.Row>{(xf_squarefootage !== undefined) ? xf_squarefootage : ''}</Grid.Row>
                    <Grid.Row>sq.ft.</Grid.Row>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
          </div>
          <div style={{position: 'absolute', top: 0, width: '100%', height: 'auto'}}>
            <Grid style={{padding: 10}}>
              <Grid.Column width={9}>
                {/*<Grid.Row style={{backgroundColor: 'green', textAlign: 'center', color: 'white'}}>Open SUN 1PM to*/}
                {/*4 PM</Grid.Row>*/}
              </Grid.Column>
              <Grid.Column floated='right' width={3}>
                <Grid.Row><Image src='static/images/heart.png' size='mini'/></Grid.Row>
              </Grid.Column>
            </Grid>
          </div>
        </div>
      </Item>
    )
  }
}
