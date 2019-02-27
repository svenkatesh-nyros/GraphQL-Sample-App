import React, {Component} from 'react';
import Layout from '../../container';
import Router from 'next/router';
import {CardList, ItemsList} from '../../common';
import {Card, Divider, Grid, Label, Segment} from 'semantic-ui-react';
import {cardData, imageData, itemData, sbody, shead, tbody, thead} from './data.json';
import {
  BlackTitle,
  ButtonItem,
  Gallery,
  InText,
  ItemData,
  LabelTag,
  LoginModal,
  MapContainer,
  SignupModal,
  TableItem,
  Title
} from '../../components';

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
      save: false,
      lmodal: false,
      smodal: false,
      heart: {},
      activePage: 1,
      activePage1: 1,
      heading: {
        icon: 'home', color: 'black', head: '125 Summerhill Ln',
        subhead: 'San Carlos, CA 94060', desc: 'Status: Active', floated: 'left'
      },
      more: false
    };
  }

  onDisplay = (e, length) => {
    let condition = length - 1;
    condition === e ? window.open('/StreetView', '_blank') : null;
  };

  onSaveNeighbor = () => {
    const {loggedin} = this.state;
    loggedin ? this.setState({save: !this.state.save}) : this.setState({smodal: true});
  };

  togglePrev = (e, {value}, id) => {
    let condition1 = id.id === 'agents';
    let condition2 = id.id === 'sale';
    // activePage= value.activePage;
    condition1 ?
      this.setState({activePage: value.activePage}) :
      condition2 ?
        this.setState({activePage1: value.activePage}) : null;
  };

  modalSubmit = (values) => {
    let id = values.id;
    id === 'smodal' ?
      Router.push('/signup') :
      id === 'lmodal' ? this.setState({lmodal: false, loggedin: true}, () => {
      }) : null;
  }


  onIcon = () => {
    this.setState({smodal: false, lmodal: false});
  }

  nextModal = (e) => {
    let id = (e.target.id);
    id === 'smodal' ?
      this.setState({smodal: false, lmodal: true}) :
      this.setState({smodal: true, lmodal: false});
  }

  onSaveHeart = index => {
    let {loggedin} = this.state;
    if (loggedin) {
      let {heart} = this.state;
      heart[index] = !heart[index];
      this.setState({heart});
    } else
      this.setState({smodal: true});
  }

  onGet = (data) => {
    let update = {
      icon: 'home', color: 'black', head: data.subhead,
      subhead: data.description, desc: 'Status: Active', floated: 'left'
    };
    let heading = this.state;
    this.setState({heading: update});
  }

  onShow = () => {
    let {more} = this.state;
    this.setState({more: !more});
  }

  render() {
    let limit = 200;
    let content = 'Experience the best of what this gorgeous updated home has to offer. San Carlos executive home 4 bedroom, 2 bath situated on a private, professioinally landscaped lot. Located in the upcoming Alder Manor neighborhood and minutes away from Facebook, this stunning home has been fully renovated from top to bottom with a sleek and modern look throughout. Taken down to studs interior and exterior transformatoin .. more';
    let {save, lmodal, smodal, heart, activePage, activePage1, heading, more} = this.state;
    return (
      <Layout search={true}>
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={10}>
              <Segment padded basic>
                <BlackTitle
                  icon={heading.icon}
                  color={heading.color}
                  head={heading.head}
                  subhead={heading.subhead}
                  desc={heading.desc}
                  floated={heading.floated}
                />
                <BlackTitle
                  color="black"
                  head="2,369 SqFt"
                  subhead="$508/SqFt"
                  floated="right"
                />
                <BlackTitle
                  color="black"
                  head="2"
                  subhead="Baths"
                  floated="right"
                />
                <BlackTitle
                  color="black"
                  head="4"
                  subhead="Beds"
                  floated="right"
                />
                <BlackTitle
                  color="black"
                  head="$1,200,000"
                  subhead="Price"
                  floated="right"
                />
              </Segment>
              <Segment basic>
                <LabelTag
                  as="a"
                  color="green"
                  ribbon
                  content="Open Sat, 1pm to 4pm"
                />
                <Gallery
                  street={true}
                  imageData={imageData}
                  toggle={this.onDisplay}
                />
              </Segment>
              <Segment basic>
                <Title name="About This Home" size="medium"/>
                {content.length <= limit ?
                  <InText
                    name={content}
                    size="small"
                  /> :
                  more ?
                    <div>
                      <InText
                        name={content}
                        size="small"
                      />
                      <span style={{cursor: 'pointer'}} onClick={this.onShow}>
  							<Title
                          name="Show Less"
                          color="blue"
                          floated="right"
                          size="small"
                        /></span>
                    </div> :
                    <div>
                      <InText
                        name={content.substring(0, limit)}
                        size="small"
                      />
                      <span style={{cursor: 'pointer'}} onClick={this.onShow}>
  							<Title
                          name="Show More"
                          color="blue"
                          floated="right"
                          size="small"
                        /></span>
                    </div>
                }
              </Segment>
              <Segment basic>
                <InText
                  name="Listing courtesy of:"
                  size="medium"
                  color="blue"
                  floated="left"
                />
                <InText
                  name="Jane Realtor, Keller Willaims Realty"
                  size="small"
                  floated="left"
                />
              </Segment>
              <Segment padded basic>
                <Card fluid raised>
                  <Grid columns="equal" padded>
                    <Grid.Column>
                      <Title name="Property Type:" size="small"/>
                      <Title name="Country:" size="small"/>
                      <Title name="Built:" size="small"/>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                      <InText
                        name="Single Family Home"
                        size="small"
                        color="blue"
                      />
                      <InText name="San Mateo" size="small" color="blue"/>
                      <InText name="1974" size="small" color="blue"/>
                    </Grid.Column>
                    <Grid.Column>
                      <Title name="Neighborhood:" size="small"/>
                      <Title name="MLS #:" size="small"/>
                      <Title name="Lot Size:" size="small"/>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                      <InText name="Alder Manor" size="small" color="blue"/>
                      <InText name="ML123455" size="small" color="blue"/>
                      <InText name="5,000 SqFt" size="small" color="blue"/>
                    </Grid.Column>
                  </Grid>
                </Card>
                {save ? (
                  <ButtonItem
                    as="div"
                    labelPosition="right"
                    floated="right"
                    // onClick={this.onSaveNeighbor}
                  >
                    <ButtonItem color="green" icon="check"/>
                    <Label
                      as="a"
                      content="Saved"
                      basic
                      color="green"
                      pointing="left"
                    />
                  </ButtonItem>
                ) : (
                  <ButtonItem
                    as="div"
                    labelPosition="right"
                    floated="right"
                    onClick={this.onSaveNeighbor}
                  >
                    <ButtonItem color="red" icon="heart"/>
                    <Label
                      as="a"
                      content="Save this Home"
                      basic
                      color="red"
                      pointing="left"
                    />
                  </ButtonItem>
                )}
              </Segment>
              <Segment basic>
                <Divider/>
                <Title name="Property History" size="medium"/>
                <TableItem color="blue" headers={thead} items={tbody}/>
              </Segment>
              <Segment basic>
                <Title name="Schools" size="medium"/>
                <TableItem color="blue" headers={shead} items={sbody}/>
              </Segment>
              <Segment basic>
                <Title name="Map" size="medium"/>
                <MapContainer/>
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment basic>
                <Title name=" DetailsNh Info" size="medium"/>
                <ItemData
                  size="small"
                  source="static/images/similarn.png"
                  head="Neighorhood 1"
                  subhead="NPI: 890"
                  desc="Vlaue Index: 116"
                  extra="Best park in the
							peninsula. Most wonderful neighbors"
                  href="DetailsNh"
                />
              </Segment>
              <Segment basic>
                <Title name="DetailsNh Map" size="medium"/>
                <Divider hidden/>
                <MapContainer/>
              </Segment>
              <Segment basic>
                <Title
                  name="Homes for Sale in this Neighborhood"
                  size="medium"
                />
                <CardList
                  id="sale"
                  cardData={cardData}
                  save={this.onSaveHeart}
                  heart={heart}
                  href="/DetailsListing"
                  prev={this.togglePrev}
                  active={activePage1}
                  getData={this.onGet}
                />
              </Segment>
              <Segment basic>
                <Title name="Top Agents for this Neighborhood" size="medium"/>
                <ItemsList
                  id="agents"
                  itemData={itemData}
                  href="/ProfileRealtor"
                  prev={this.togglePrev}
                  active={activePage}/>
              </Segment>
              <LoginModal open={lmodal}
                change={this.feildChange}
                submit={this.modalSubmit}
                next={this.nextModal}
                iconclick={this.onIcon}/>
              <SignupModal open={smodal}
                change={this.feildChange}
                submit={this.modalSubmit}
                next={this.nextModal}
                iconclick={this.onIcon}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default Listing;
