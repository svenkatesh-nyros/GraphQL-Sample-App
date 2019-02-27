import React from 'react'
import {Item} from 'semantic-ui-react'
import NeighbourhoodGroup from '../PresentationalComponent/NeighbourhoodGroup';

class Neighbourhood extends React.Component {

  allData = {
    top: [],
    other: [],
    saved: []
  };

  page = {
    top: 0,
    other: 0,
    saved: 0
  };

  dis = {
    top: false,
    topPrev: true,
    other: false,
    otherPrev: true,
    saved: false,
    savedPrev: true
  };

  state = {
    dataTop: [],
    dataOther: [],
    dataSaved: [],
  };

  dataPerPage = 3;
  selectedData = false;

  componentWillReceiveProps(props) {
    this.selectedData = props.selectedData;
    this.allData.top = props.data.filter(d => d.type === 'Top Neighbourhood');
    this.allData.other = props.data.filter(d => d.type === 'Recommended Neighbourhood');
    this.allData.saved = props.data.filter(d => d.type === 'Saved Neighbourhood');
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
    let typeKey = `data${type.charAt(0).toUpperCase() + type.slice(1)}`
    newState[typeKey] = this.allData[type].slice(page * this.dataPerPage, ((page + 1) * this.dataPerPage))
    this.setState(newState);
  }

  render() {
    return (
      <div>
        {(this.props.selectedData.type !== 'listing' && this.props.selectedData !== false)
          ? <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header as='a'>Selected Neighbourhood</Item.Header>
              </Item.Content>
            </Item>
            <Item key='33'>
              <Item.Image size='small' src='static/images/Neighborhood1.jpg'/>
              <Item.Content>
                <Item.Header as='a'>{this.props.selectedData.all.NAME}</Item.Header>
                <Item.Description>
                  <p>NPI : {this.props.selectedData.all.NPI}</p>
                  <p>Personal : {this.props.selectedData.all.personal}</p>
                  <p>Value Index: {this.props.selectedData.all.value}</p>
                  <p>Schools : {this.props.selectedData.all.school}</p>
                  <p>Crime : {this.props.selectedData.all.crime}</p>
                  <p>Walkability : {this.props.selectedData.all.walkability}</p>
                  <p>Community : {this.props.selectedData.all.community}</p>
                  <p>Curb : {this.props.selectedData.all.curb}</p>
                  <p>Others : {this.props.selectedData.all.others}</p>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
          : null
        }
        <NeighbourhoodGroup
          title={'Top Neighbourhood'}
          data={this.state.dataTop}
          previous={this.dis.topPrev}
          next={this.dis.top}
          onClickPrevious={() => this.handlePrevious('top')}
          onClickNext={() => this.handleNext('top')}
        />
        <NeighbourhoodGroup
          title={'Other Recommended Neighbourhood'}
          data={this.state.dataOther}
          previous={this.dis.otherPrev}
          next={this.dis.other}
          onClickPrevious={() => this.handlePrevious('other')}
          onClickNext={() => this.handleNext('other')}
        />
        <NeighbourhoodGroup
          title={'Saved Neighbourhood'}
          data={this.state.dataSaved}
          previous={this.dis.savedPrev}
          next={this.dis.saved}
          onClickPrevious={() => this.handlePrevious('saved')}
          onClickNext={() => this.handleNext('saved')}
        />
      </div>
    )
  }
}

export default Neighbourhood
