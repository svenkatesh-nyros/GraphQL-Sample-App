import React from 'react'
import {Button, Grid, Item, Radio, Select} from 'semantic-ui-react'

const op = [
  {value: 0, label: '0'},
  {value: 1, label: '1'},
  {value: 2, label: '2'},
  {value: 3, label: '3'},
  {value: 4, label: '4'},
  {value: 5, label: '5'},
  {value: 6, label: '6'}
];

export default class FilterGroup extends React.Component {

  render() {
    return (
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header as='a'>Refine Home Search</Item.Header>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header as='a' style={{padding: 10}}>Price</Item.Header>
            <Item.Description as='a'>
              <Grid>
                <Grid.Column width={6}>
                  <Grid.Row><Select style={{minWidth: '5em'}} placeholder='No Min' options={op}></Select></Grid.Row>
                </Grid.Column>
                <Grid.Column style={{alignSelf: 'center'}}>
                  <Grid.Row>To</Grid.Row>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Grid.Row><Select placeholder='No Max' style={{minWidth: '5em'}} options={op}></Select></Grid.Row>
                </Grid.Column>
              </Grid>
            </Item.Description>


            <Item.Header as='a' style={{padding: 10}}>Beds</Item.Header>
            <Item.Description as='a'>
              <Grid>
                <Grid.Column width={6}>
                  <Grid.Row><Select style={{minWidth: '5em'}} placeholder='No Min' options={op}></Select></Grid.Row>
                </Grid.Column>
                <Grid.Column style={{alignSelf: 'center'}}>
                  <Grid.Row>To</Grid.Row>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Grid.Row><Select placeholder='No Max' style={{minWidth: '5em'}} options={op}></Select></Grid.Row>
                </Grid.Column>
              </Grid>
            </Item.Description>

            <Item.Header as='a' style={{padding: 10}}>Baths</Item.Header>
            <Item.Description as='a'>
              <Grid>
                <Grid.Column width={6}>
                  <Grid.Row><Select style={{minWidth: '5em'}} placeholder='No Min' options={op}></Select></Grid.Row>
                </Grid.Column>
                <Grid.Column style={{alignSelf: 'center'}}>
                  <Grid.Row>To</Grid.Row>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Grid.Row><Select placeholder='No Max' style={{minWidth: '5em'}} options={op}></Select></Grid.Row>
                </Grid.Column>
              </Grid>
            </Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Content>
            <Item.Header as='a'>Property Type</Item.Header>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header as='a' style={{paddingBottom: 10}}>Listing Status</Item.Header>
            <Item.Description as='a'>
              <Grid>
                <Grid.Column width={16}>
                  <Grid.Row><Radio toggle label='For Sale'/></Grid.Row>
                </Grid.Column>
                <Grid.Column width={16}>
                  <Grid.Row><Radio toggle label='Sold'/></Grid.Row>
                </Grid.Column>
              </Grid>


            </Item.Description>

          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header as='a' style={{padding: 10}}>Square Feet</Item.Header>
            <Item.Description as='a'>
              <Grid>
                <Grid.Column width={6}>
                  <Grid.Row><Select style={{minWidth: '5em'}} placeholder='No Min' options={op}></Select></Grid.Row>
                </Grid.Column>
                <Grid.Column style={{alignSelf: 'center'}}>
                  <Grid.Row>To</Grid.Row>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Grid.Row><Select placeholder='No Max' style={{minWidth: '5em'}} options={op}></Select></Grid.Row>
                </Grid.Column>
              </Grid>
            </Item.Description>


            <Item.Header as='a' style={{padding: 10}}>Lot Size</Item.Header>
            <Item.Description as='a'>
              <Grid>
                <Grid.Column width={6}>
                  <Grid.Row><Select style={{minWidth: '5em'}} placeholder='No Min' options={op}></Select></Grid.Row>
                </Grid.Column>
                <Grid.Column style={{alignSelf: 'center'}}>
                  <Grid.Row>To</Grid.Row>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Grid.Row><Select placeholder='No Max' style={{minWidth: '5em'}} options={op}></Select></Grid.Row>
                </Grid.Column>
              </Grid>
            </Item.Description>

            <Item.Header as='a' style={{padding: 10}}>Year Built</Item.Header>
            <Item.Description as='a'>
              <Grid>
                <Grid.Column width={6}>
                  <Grid.Row><Select style={{minWidth: '5em'}} placeholder='No Min' options={op}></Select></Grid.Row>
                </Grid.Column>
                <Grid.Column style={{alignSelf: 'center'}}>
                  <Grid.Row>To</Grid.Row>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Grid.Row><Select placeholder='No Max' style={{minWidth: '5em'}} options={op}></Select></Grid.Row>
                </Grid.Column>
              </Grid>
            </Item.Description>

            <Item.Header as='a' style={{padding: 10}}>Max HOA Fees</Item.Header>
            <Item.Description as='a'>
              <Grid>
                <Grid.Column width={6}>
                  <Grid.Row><Select style={{minWidth: '5em'}} placeholder='No Max' options={op}></Select></Grid.Row>
                </Grid.Column>
              </Grid>
            </Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Button secondary style={{float: 'right'}}>Apply Filters</Button>
        </Item>
      </Item.Group>
    )
  }
}