import React from 'react';
import {Button, Item} from 'semantic-ui-react'
import NeighbourhoodItem from './NeighbourhoodItem';

export default class NeighbourhoodGroup extends React.Component {

  render() {
    return (
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header as='a'>{this.props.title}</Item.Header>
          </Item.Content>
        </Item>
        {
          this.props.data.map((datas, index) => {
            return <NeighbourhoodItem item={datas} index={index}  key={index}/>
          })
        }
        <Item style={{justifyContent: 'center'}}>
          <Button primary onClick={() => this.props.onClickPrevious()} disabled={this.props.previous}>Previous</Button>
          <Button secondary onClick={() => this.props.onClickNext()} disabled={this.props.next}>Next</Button>
        </Item>
      </Item.Group>
    )
  }
}
