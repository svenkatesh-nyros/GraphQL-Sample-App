import React, {Component} from 'react';
import Layout from '../../container';
import {Divider, Grid} from 'semantic-ui-react';
import {CustomItems, InText, Title} from '../../components';
import {Activities, Base} from '../../common';
import {activityData, baseData, itemData} from './data.json';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      activePage: 1,
      display: {}
    };
  }

  togglePrev = (e, {value}, id) => {
    this.setState({activePage: value.activePage});
  };

  handleClick = (e, index) => {
    let {display} = this.state;
    display[index] = !display[index];
    this.setState({display});
  }

  render() {
    let {activePage, display} = this.state;
    return (
      <Layout search>
        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={10}>
              <Grid>
                <Base baseData={baseData}/>
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Title name="About Me:" floated="left" size="medium"/>
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <InText
                      textAlign="justified"
                      name="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider/>
              <Title name="My Activities" floated="left" size="medium"/>
              <Divider hidden/>
              <Divider hidden/>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={2}/>
                  <Grid.Column width={6}>
                    <Title
                      basic
                      content="Neighborhoods Reviewed: 6"
                      size="small"
                    />
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Title basic content="Questions Answered: 6" size="small"/>
                  </Grid.Column>
                  <Grid.Column width={2}/>
                </Grid.Row>
              </Grid>
              <Divider hidden/>
              <Activities activityData={activityData}
                onClick={this.handleClick}
                display={display}
                href="/DetailsNh"/>
            </Grid.Column>
            <Grid.Column width={6}>
              <Title name="Top Listings in My Neighborhood(s)" floated="left" size="medium"/>
              <Divider hidden/>
              <Divider hidden/>
              <CustomItems
                id="current"
                itemData={itemData}
                prev={this.togglePrev}
                active={activePage}
                href="DetailsListing"/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default Profile;
