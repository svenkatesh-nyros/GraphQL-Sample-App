import React, {Component} from 'react';
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import {from} from 'zen-observable';
import withData from '../withData';

//Add Agent Query
const GQLAddAgent = gql`
    mutation addAgent($realEstateFirm: String, $license: String, $phone: String){
        createMyAgentType(input: {
            realEstateFirm: $realEstateFirm
            license: $license
            phone: $phone
            
    }) {
            id
            realEstateFirm
            license
            phone

    }
    }
`;

//Update Agent Query
const GQLUpdateAgent = gql`
    mutation updateAgent($id: String!, $phone: String){
      updateMyAgentType(input: {
      id: $id  
      phone: $phone
    }) {
      id
      phone
    }
    }
`;

//Delete Agent Query
const GQLDeleteAgent = gql`
mutation deleteAgent($id: String!) {
  deleteMyAgentType(input: {
        id: $id        
      }) {
        id
      }
      }
  `;

//List Agent Query
const query = gql`
query listMyAgentTypes{
  listMyAgentTypes(limit: 10){
    items{
        id
        realEstateFirm
        license
        phone
    }
  }
}
`;

//List Agents by ID
const getAgentbyid = gql`
query getAgentType{
      getAgentType(id:"20fba68f-cb63-4bc5-80c6-e8a7f3546703"){
        id
        realEstateFirm
        license
        phone
      }
    
}
`

class Agentdata extends Component {
  constructor(props) {
    super(props);
    this.realEstateFirm = '';
    this.license = '';
    this.phone = '';

    this.objAddAgent = {};
    this.objUpdateAgent = {};
    this.objDeleteAgent = {};
  }

  //Add Agent Function
  addAgent = () => {

    this.objAddAgent = {
      /*realEstateFirm= this.realEstateFirm, 
        license= this.license,
        phone= this.phone

      */
      realEstateFirm: 'XTZ consultant',
      license: 'CA124584756',
      phone: '+1-613-555-0168'

    }
    this.props.addAgent(this.objAddAgent);
    this.objAddAgent = {};
  }

  //Update Agent Function
  updateAgent = () => {

    this.objUpdateAgent = {
      id: '20fba68f-cb63-4bc5-80c6-e8a7f3546703',
      phone: '+1-613-555-0169',

    }
    this.props.updateAgent(this.objUpdateAgent);
    this.objUpdateAgent = {};
  }

  //Delete Agent Function
  deleteAgent = () => {

    this.objDeleteAgent = {
      id: '20fba68f-cb63-4bc5-80c6-e8a7f3546703'
    }
    this.props.deleteAgent(this.objDeleteAgent);
    this.objDeleteAgent = {};
  }


  render() {
    console.log('props: ', this.props)

    return (<div>

      <button onClick={this.addAgent}>Add Agent</button>
      <button onClick={this.updateAgent}>Update Agent</button>
      <button onClick={this.deleteAgent}>Delete Agent</button>

      <h2>Listing Agent</h2>
      {

        this.props.MyAgentTypeTable.map((Agent, index) => (

          <p> Firm: {Agent.realEstateFirm}<br/>
            Phone: {Agent.phone}<br/>
            <hr/>
          </p>
        ))


      }

    </div>)
  }

}

const AppWithAgentGraphQueries = compose(
  //Add Agent
  graphql(GQLAddAgent, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      addAgent: objAddAgent => {
        props.mutate({
          variables: objAddAgent,
          optimisticResponse: {
            __typename: 'Agent',
            createMyAgentType: {
              ...objAddAgent,
              __typename: 'Agent'
            }
          },
        })
      },

    })
  }),

  //Update Agent
  graphql(GQLUpdateAgent, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      updateAgent: objUpdateAgent => {
        props.mutate({
          variables: objUpdateAgent,
          optimisticResponse: {
            __typename: 'Agent',
            updateMyAgentType: {
              ...objUpdateAgent,
              __typename: 'Agent'
            }
          },
        })
      },

    })
  }),

  //Delete Agent
  graphql(GQLDeleteAgent, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      deleteAgent: objDeleteAgent => {
        props.mutate({
          variables: objDeleteAgent,
          optimisticResponse: {
            __typename: 'Agent',
            deleteMyAgentType: {
              ...objDeleteAgent,
              __typename: 'Agent'
            }
          },
        })
      },

    })
  }),

  //Listing Agent
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      MyAgentTypeTable: props.data.listMyAgentTypes ? props.data.listMyAgentTypes.items : []
    })
  }),
)(Agentdata)


export default withData(AppWithAgentGraphQueries)
