import React, {Component} from 'react';
import Layout from '../../container';
import {Divider, Grid, Segment} from 'semantic-ui-react';
import {CustomItems, InText, Title} from '../../components';
import {Activities, Base, Contact} from '../../common';
import {activityData, baseData, formData, homeData, itemData} from './data.json';

class Realtor extends Component {
  constructor() {
    super();
    this.state = {
      activePage: 1,
      activePage1: 1,
      display: {}
    };
  }

  togglePrev = (e, {value}, id) => {
    let condition1 = id.id === 'current';
    let condition2 = id.id === 'previous';
    condition1 ?
      this.setState({activePage: value.activePage}) :
      condition2 ?
        this.setState({activePage1: value.activePage}) : null;
  };

  handleClick = (e, index) => {
    let {display} = this.state;
    display[index] = !display[index];
    this.setState({display});
  }

  render() {
    let {activePage, activePage1, display} = this.state;
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
              <Title name="My Activities" size="medium"/>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={3}/>
                  <Grid.Column width={5}>
                    <Title
                      basic
                      content="Neighborhoods Reviewed: 5"
                      size="small"
                    />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Title basic content="Questions Answered: 6" size="small"/>
                  </Grid.Column>
                  <Grid.Column width={3}/>
                </Grid.Row>
              </Grid>
              <Activities activityData={activityData}
                onClick={this.handleClick}
                display={display}
                href="/DetailsNh"/>
            </Grid.Column>
            <Grid.Column width={6}>
              <Title name="Contact Me" floated="left" size="medium"/>
              <Divider hidden/>
              <Contact formData={formData}/>
              <Divider hidden/>
              <Title name="My Current Listing" floated="left" size="medium"/>
              <Divider hidden/>
              <Divider hidden/>
              <Segment basic>
                <CustomItems
                  id="current"
                  itemData={homeData}
                  prev={this.togglePrev}
                  active={activePage}
                  href="DetailsListing"/>
              </Segment>
              <Title name="My Previous Listing" floated="left" size="medium"/>
              <Divider hidden/>
              <Divider hidden/>
              <Segment basic>
                <CustomItems
                  id="previous"
                  itemData={itemData}
                  prev={this.togglePrev}
                  active={activePage1}
                  href="DetailsListing"/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default Realtor;
