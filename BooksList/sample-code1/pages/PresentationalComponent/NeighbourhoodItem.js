import React from 'react';
import {Item} from 'semantic-ui-react'

export default class NeighbourhoodItem extends React.Component {

  render() {
    const {NPI, neighborhood_name, value_index, review_summary} = this.props.item;
    const index = this.props.index;
    return (
      <Item key={(Date.now() + NPI + index).toString()}>
        <Item.Image size='small' src='static/images/Neighborhood1.jpg'/>
        <Item.Content>
          <Item.Header as='a'>{neighborhood_name}</Item.Header>
          <Item.Description>
            <p>NPI: {NPI}</p>
            <p>Value Index: {value_index}</p>
            <p>{review_summary}</p>
          </Item.Description>
        </Item.Content>
      </Item>
    )
  }
}
