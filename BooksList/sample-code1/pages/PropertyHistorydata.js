import React, {Component} from 'react';
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import {from} from 'zen-observable';
import withData from '../withData';

//Add PropertyHistory Query
const GQLAddPropertyHistory = gql`
    mutation addPropertyHistory($date: String, $event: String, $price: Int){
        createMyPropertyHistoryType(input: {
            date: $date
            event: $event
            price: $price                      
    }) {
            id
            date
            event
            price
    }
    }
`;

//Update PropertyHistory Query
const GQLUpdatePropertyHistory = gql`
    mutation updatePropertyHistory($id: String!, $price: Int){
      updateMyPropertyHistoryType(input: {
      id: $id  
      price: $price
    }) {
      id
      price
    }
    }
`;

//Delete PropertyHistory Query
const GQLDeletePropertyHistory = gql`
mutation deletePropertyHistory($id: String!) {
  deleteMyPropertyHistoryType(input: {
        id: $id        
      }) {
        id
      }
      }
  `;

//List PropertyHistory Query
const query = gql`
query listMyPropertyHistoryTypes{
  listMyPropertyHistoryTypes(limit: 10){
    items{
        id
        date
        event
        price
    }
  }
}
`;

//List PropertyHistorys by ID
const getPropertyHistorybyid = gql`
query getPropertyHistoryType{
      getPropertyHistoryType(id:"f2892dda-9ea6-479e-8f37-1c8bfc8c7c0f"){
        id
        date
        event
        price
      }
    
}
`


class PropertyHistorydata extends Component {
  constructor(props) {
    super(props);
    this.date = '';
    this.event = '';
    this.price = '';

    this.objAddPropertyHistory = {};
    this.objUpdatePropertyHistory = {};
    this.objDeletePropertyHistory = {};
  }

  //Add PropertyHistory Function
  addPropertyHistory = () => {

    this.objAddPropertyHistory = {
      /*date= this.date, 
        event= this.event,
        price= this.price
      */
      date: '05-12-2018',
      event: 'House Exibition',
      price: 300

    }
    this.props.addPropertyHistory(this.objAddPropertyHistory);
    this.objAddPropertyHistory = {};
  }

  //Update PropertyHistory Function
  updatePropertyHistory = () => {

    this.objUpdatePropertyHistory = {
      id: 'f2892dda-9ea6-479e-8f37-1c8bfc8c7c0f',
      price: 500

    }
    this.props.updatePropertyHistory(this.objUpdatePropertyHistory);
    this.objUpdatePropertyHistory = {};
  }

  //Delete PropertyHistory Function
  deletePropertyHistory = () => {

    this.objDeletePropertyHistory = {
      id: 'f2892dda-9ea6-479e-8f37-1c8bfc8c7c0f'
    }
    this.props.deletePropertyHistory(this.objDeletePropertyHistory);
    this.objDeletePropertyHistory = {};
  }


  render() {
    console.log('props: ', this.props)

    return (<div>

      <button onClick={this.addPropertyHistory}>Add PropertyHistory</button>
      <button onClick={this.updatePropertyHistory}>Update PropertyHistory</button>
      <button onClick={this.deletePropertyHistory}>Delete PropertyHistory</button>

      <h2>Listing PropertyHistory</h2>
      {

        this.props.MyPropertyHistoryTypeTable.map((PropertyHistory, index) => (

          <p> Event: {PropertyHistory.event}<br/>
            Price: {PropertyHistory.price}<br/>
            <hr/>
          </p>
        ))


      }

    </div>)
  }

}

const AppWithPropertyHistoryGraphQueries = compose(
  //Add PropertyHistory
  graphql(GQLAddPropertyHistory, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      addPropertyHistory: objAddPropertyHistory => {
        props.mutate({
          variables: objAddPropertyHistory,
          optimisticResponse: {
            __typename: 'PropertyHistory',
            createMyPropertyHistoryType: {
              ...objAddPropertyHistory,
              __typename: 'PropertyHistory'
            }
          },
        })
      },

    })
  }),

  //Update PropertyHistory
  graphql(GQLUpdatePropertyHistory, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      updatePropertyHistory: objUpdatePropertyHistory => {
        props.mutate({
          variables: objUpdatePropertyHistory,
          optimisticResponse: {
            __typename: 'PropertyHistory',
            updateMyPropertyHistoryType: {
              ...objUpdatePropertyHistory,
              __typename: 'PropertyHistory'
            }
          },
        })
      },

    })
  }),

  //Delete PropertyHistory
  graphql(GQLDeletePropertyHistory, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      deletePropertyHistory: objDeletePropertyHistory => {
        props.mutate({
          variables: objDeletePropertyHistory,
          optimisticResponse: {
            __typename: 'PropertyHistory',
            deleteMyPropertyHistoryType: {
              ...objDeletePropertyHistory,
              __typename: 'PropertyHistory'
            }
          },
        })
      },

    })
  }),

  //Listing PropertyHistory
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      MyPropertyHistoryTypeTable: props.data.listMyPropertyHistoryTypes ? props.data.listMyPropertyHistoryTypes.items : []
    })
  }),
)(PropertyHistorydata)


export default withData(AppWithPropertyHistoryGraphQueries)
