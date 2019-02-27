import React, {Component} from 'react';
import {Container, Grid, Segment} from 'semantic-ui-react';
import {InText} from '../../../components';

class LandingFooter extends Component {
  render() {
    return (
      <Segment vertical color="blue">
        <Container textAlign='center'>
          <Grid columns={4} divided stackable>
            <Grid.Row>
              <Grid.Column>
                <InText name="About Us" color="grey"/>
              </Grid.Column>
              <Grid.Column>
                <InText name="Feedback"/>

              </Grid.Column>
              <Grid.Column>
                <InText name="Career"/>

              </Grid.Column>
              <Grid.Column>
                <InText name="Result"/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

export default LandingFooter;
