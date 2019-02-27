import React from 'react'
import {Button, Grid, Item} from 'semantic-ui-react'
import HomeItem from './HomeItem';

export default class HomeGroup extends React.Component {

  render() {
    return (
      <Item.Group key={(new Date().valueOf()).toString()}>
        {(this.props.title) && <Item>
          <Item.Content>
            <Item.Header as='a'>{this.props.title}</Item.Header>
            <Item.Description as='a'>
              <Grid>
                <Grid.Column width={12}>
                  <Grid.Row>{this.props.subtitle}</Grid.Row>
                </Grid.Column>
              </Grid>
            </Item.Description>
          </Item.Content>
        </Item>}
        {
          this.props.data.map((datas, index) => {
            return <HomeItem key={index.toString()} item={datas}/>
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
