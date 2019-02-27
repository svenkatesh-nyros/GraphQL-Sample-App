import React, {Component} from 'react';
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import {from} from 'zen-observable';
import withData from '../withData';

//Add Savedneighbor Query
const GQLAddSavedneighbor = gql`
    mutation addSavedneighbor($neighborhoodId: String, $name: String, $city: String, $state: String, $savedDate: String){
        createMySavedneighborType(input: {
            neighborhoodId: $neighborhoodId
            name: $name
            city: $city
            state: $state
            savedDate: $savedDate                   
    }) {
            id
            neighborhoodId
            name
            city
            state
            savedDate
    }
    }
`;

//Update Savedneighbor Query
const GQLUpdateSavedneighbor = gql`
    mutation updateSavedneighbor($id: ID!, $name: String){
      updateMySavedneighborType(input: {
      id: $id  
      name: $name
    }) {
      id
      name
    }
    }
`;

//Delete Savedneighbor Query
const GQLDeleteSavedneighbor = gql`
mutation deleteSavedneighbor($id: ID!) {
  deleteMySavedneighborType(input: {
        id: $id        
      }) {
        id
      }
      }
  `;

//List Savedneighbor Query
const query = gql`
query listMySavedneighborTypes{
  listMySavedneighborTypes(limit: 10){
    items{
            id
            neighborhoodId
            name
            city
            state
            savedDate
    }
  }
}
`;

//List Savedneighbors by ID
const getSavedneighborbyid = gql`
query getSavedneighborType{
      getSavedneighborType(id:"f9bda599-8c8c-4537-9234-f5227a1da70b"){
            id
            neighborhoodId
            name
            city
            state
            savedDate
      }
    
}
`


class Savedneighbordata extends Component {
  constructor(props) {
    super(props);
    this.neighborhoodId = '';
    this.name = '';
    this.city = '';
    this.state = '';
    this.savedDate = '';

    this.objAddSavedneighbor = {};
    this.objUpdateSavedneighbor = {};
    this.objDeleteSavedneighbor = {};
  }

  //Add Savedneighbor Function
  addSavedneighbor = () => {

    this.objAddSavedneighbor = {
      /*neighborhoodId= this.neighborhoodId, 
        name= this.name,
        city= this.city,
        state= this.state,
        savedDate= this.savedDate
      */
      neighborhoodId: 'abcd-12345',
      name: 'Rvierdale, Torento',
      city: 'Torento',
      state: 'Canda',
      savedDate: '06-05-2018'

    }
    this.props.addSavedneighbor(this.objAddSavedneighbor);
    this.objAddSavedneighbor = {};
  }

  //Update Savedneighbor Function
  updateSavedneighbor = () => {

    this.objUpdateSavedneighbor = {
      id: 'f9bda599-8c8c-4537-9234-f5227a1da70b',
      name: 'Annex'

    }
    this.props.updateSavedneighbor(this.objUpdateSavedneighbor);
    this.objUpdateSavedneighbor = {};
  }

  //Delete Savedneighbor Function
  deleteSavedneighbor = () => {

    this.objDeleteSavedneighbor = {
      id: 'f9bda599-8c8c-4537-9234-f5227a1da70b'
    }
    this.props.deleteSavedneighbor(this.objDeleteSavedneighbor);
    this.objDeleteSavedneighbor = {};
  }


  render() {
    console.log('props: ', this.props)

    return (<div>

      <button onClick={this.addSavedneighbor}>Add Savedneighbor</button>
      <button onClick={this.updateSavedneighbor}>Update Savedneighbor</button>
      <button onClick={this.deleteSavedneighbor}>Delete Savedneighbor</button>

      <h2>Listing Savedneighbor</h2>
      {

        this.props.MySavedneighborTypeTable.map((Savedneighbor, index) => (

          <p> Name: {Savedneighbor.name}<br/>
            City: {Savedneighbor.city}<br/>
            <hr/>
          </p>
        ))


      }

    </div>)
  }

}

const AppWithSavedneighborGraphQueries = compose(
  //Add Savedneighbor
  graphql(GQLAddSavedneighbor, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      addSavedneighbor: objAddSavedneighbor => {
        props.mutate({
          variables: objAddSavedneighbor,
          optimisticResponse: {
            __typename: 'Savedneighbor',
            createMySavedneighborType: {
              ...objAddSavedneighbor,
              __typename: 'Savedneighbor'
            }
          },
        })
      },

    })
  }),

  //Update Savedneighbor
  graphql(GQLUpdateSavedneighbor, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      updateSavedneighbor: objUpdateSavedneighbor => {
        props.mutate({
          variables: objUpdateSavedneighbor,
          optimisticResponse: {
            __typename: 'Savedneighbor',
            updateMySavedneighborType: {
              ...objUpdateSavedneighbor,
              __typename: 'Savedneighbor'
            }
          },
        })
      },

    })
  }),

  //Delete Savedneighbor
  graphql(GQLDeleteSavedneighbor, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      deleteSavedneighbor: objDeleteSavedneighbor => {
        props.mutate({
          variables: objDeleteSavedneighbor,
          optimisticResponse: {
            __typename: 'Savedneighbor',
            deleteMySavedneighborType: {
              ...objDeleteSavedneighbor,
              __typename: 'Savedneighbor'
            }
          },
        })
      },

    })
  }),

  //Listing Savedneighbor
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      MySavedneighborTypeTable: props.data.listMySavedneighborTypes ? props.data.listMySavedneighborTypes.items : []
    })
  }),
)(Savedneighbordata)


export default withData(AppWithSavedneighborGraphQueries)
