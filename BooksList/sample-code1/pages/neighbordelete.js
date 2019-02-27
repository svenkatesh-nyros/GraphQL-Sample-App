import React from 'react'
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import withData from '../withData'


const mutation = gql`
mutation deleteNeighborType($id: String!) {
    deleteNeighborType(input: {
        id: $id        
      }) {
        id
      }
      }
  `

class App extends React.Component {
  state = {
    todo: ''
  };
  deleteNeighborType = () => {

    const todo = {
      id: 'f25cedbb-7d56-456b-9507-c0d3d6adb9b3'
    }
    this.props.deleteNeighborType(todo)
    this.setState({
      todo: ''
    })
  }

  render() {
    console.log('props: ', this.props)

    return (<div>
      <button onClick={this.deleteNeighborType}>Delete Neighbor</button>
    </div>)
  }
}

const AppWithdeleteNeighborType = compose(
  graphql(mutation, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      deleteNeighborType: todo => {
        props.mutate({
          variables: todo,
          optimisticResponse: {
            __typename: 'NeighborType',
            deleteNeighborType: {
              ...todo,
              __typename: 'NeighborType'
            }
          },
        })
      }
    })
  }),
)(App)


export default withData(AppWithdeleteNeighborType)
