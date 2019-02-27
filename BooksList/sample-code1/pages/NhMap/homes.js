import React from 'react'
import {Button, Grid, Image, Item} from 'semantic-ui-react'
import HomeGroup from '../PresentationalComponent/HomeGroup';
import FilterGroup from '../PresentationalComponent/FilterGroup';
import millify from 'millify'

class Homes extends React.Component {

  allData = {
    top: [],
    other: [],
    saved: []
  };
  dataPerPage = 3;

  page = {
    top: 0,
    other: 0,
    saved: 0
  }

  dis = {
    top: false,
    topPrev: true,
    other: false,
    otherPrev: true,
    saved: false,
    savedPrev: true
  }

  state = {
    dataTop: [],
    dataOther: [],
    dataSaved: [],
    hideShowPanel: false
  }
  selectedData = false;


  componentWillReceiveProps(props) {
    this.selectedData = props.data;
    this.allData.top = props.data;
    this.allData.other = props.data;
    this.allData.saved = props.data;

    this.dis.top = (this.allData.top.length < this.dataPerPage) ? true : false;
    this.dis.other = (this.allData.other.length < this.dataPerPage) ? true : false;
    this.dis.saved = (this.allData.saved.length < this.dataPerPage) ? true : false;

    this.reRenderData(0, 'top');
    this.reRenderData(0, 'other');
    this.reRenderData(0, 'saved');
  }

  handlePrevious(type) {
    let str = type + 'Prev';
    this.dis[type] = false;
    let page = Math.max(0, this.page[type] - 1);
    if (page !== 0) {
      this.reRenderData(page, type);
    } else {
      this.dis[str] = true
      this.reRenderData(page, type);
    }
  }

  handleNext(type) {
    let str = type + 'Prev';
    this.dis[str] = false;
    let page = Math.min(Math.ceil(this.allData[type].length / this.dataPerPage), this.page[type] + 1);
    if (page < (this.allData[type].length / this.dataPerPage) - 1) {
      this.reRenderData(page, type);
    } else {
      this.dis[type] = true
      this.reRenderData(page, type);
    }

  }

  reRenderData(page, type) {
    this.page[type] = page;
    let newState = {};
    let typeKey = `data${type.charAt(0).toUpperCase() + type.slice(1)}`;
    newState[typeKey] = this.allData[type].slice(page * this.dataPerPage, ((page + 1) * this.dataPerPage));
    this.setState(newState);
  }

  handleButton = () => {
    this.setState({
      hideShowPanel: !this.state.hideShowPanel
    })
  };

  render() {

    const {hideShowPanel} = this.state;
    return (
      <div>
        <Item.Group>
          {
            !hideShowPanel && this.props.selectedData !== false &&
            <Item>
              <div className="ui fluid image">
                <Image style={{height: 200}}
                  src={(this.props.selectedData.images !== undefined) ? this.props.selectedData.images[0] : 'static/images/Neighborhood1.jpg'}/>
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
                      <Grid.Row>${millify(this.props.selectedData.listPrice)}</Grid.Row>
                      <Grid.Row>{this.props.selectedData.address.street}</Grid.Row>
                      <Grid.Row>{this.props.selectedData.address.city}, {this.props.selectedData.address.state} {this.props.selectedData.address.zip}</Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={7}>
                      <Grid divided style={{padding: 10, textAlign: 'center'}}>
                        <Grid.Column width={5}>
                          <Grid.Row>{(this.props.selectedData.beds !== undefined) ? this.props.selectedData.beds : ''}</Grid.Row>
                          <Grid.Row>Beds</Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <Grid.Row>{(this.props.selectedData.baths !== undefined) ? this.props.selectedData.baths.total : ''}</Grid.Row>
                          <Grid.Row>Baths</Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={6}>
                          <Grid.Row>{(this.props.selectedData.xf_squarefootage !== undefined) ? this.props.selectedData.xf_squarefootage : ''}</Grid.Row>
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
          }

          <Item>
            <Item.Content>
              <Item.Header as='a'>{hideShowPanel ? 'Home Listing' : 'Top Homes'}</Item.Header>
              <Item.Description as='a'>
                <Grid>
                  <Grid.Column width={6} style={{alignSelf: 'center'}}>
                    <Grid.Row>{hideShowPanel ? 'By: Personal NPI' : 'By: NPI'}</Grid.Row>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Grid.Row><Button primary onClick={this.handleButton}>Filter Homes</Button></Grid.Row>
                  </Grid.Column>
                </Grid>
              </Item.Description>
            </Item.Content>
          </Item>

          {!hideShowPanel && <HomeGroup
            key={'0'}
            data={this.state.dataTop}
            previous={this.dis.topPrev}
            next={this.dis.top}
            onClickPrevious={() => this.handlePrevious('top')}
            onClickNext={() => this.handleNext('top')}
          />}

        </Item.Group>
        {hideShowPanel
          ? <FilterGroup/>
          : <div>
            <HomeGroup
              key={'1'}
              title={'Recommended Homes'}
              subtitle={'By: NPI ( at 20 miles radius )'}
              data={this.state.dataOther}
              previous={this.dis.otherPrev}
              next={this.dis.other}
              onClickPrevious={() => this.handlePrevious('other')}
              onClickNext={() => this.handleNext('other')}
            />
            <HomeGroup
              key={'2'}
              title={'Saved Homes'}
              subtitle={'( all Saved Homes )'}
              data={this.state.dataSaved}
              previous={this.dis.savedPrev}
              next={this.dis.saved}
              onClickPrevious={() => this.handlePrevious('saved')}
              onClickNext={() => this.handleNext('saved')}
            />
          </div>
        }
      </div>
    )
  }
}


export default Homes
