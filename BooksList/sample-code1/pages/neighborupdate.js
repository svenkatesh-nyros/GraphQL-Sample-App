import React from 'react'
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import withData from '../withData'


const mutation = gql`
mutation  updateNeighborType($id: String!, $name: String){
    updateNeighborType(input: {
      id: $id  
      name: $name
     
    }) {
      id
      name
      city
      state
      npiCityRanking
      npiAreaRanking
      reviewSummary
      reviews
      questionAndAnswers
      similarNeighborhoods
      topAgents
      factors
      keyWords
    }
    }
`


class App extends React.Component {


  state = {
    todo: ''
  };
  updateNeighborType = () => {


    const todo = {
      id: '76e3d89b-5013-4846-b14f-c17f0b03e4bf',
      name: 'Rakesh Patel',
      /* city: "Ahmedabad",
       state: "Gujarat",
       npiCityRanking: 10,
       npiAreaRanking: 5555,
       reviewSummary: "Testing",
       reviews: reviewsJSON,
       questionAndAnswers: questionAndAnswersJSON,
       similarNeighborhoods: similarNeighborhoodsJSON,
       topAgents: topAgentsJSON,
       factors: factorsJSON,
       keyWords: keyWordsJSON,*/

    }
    this.props.updateNeighborType(todo)
    this.setState({
      todo: ''
    })
  }

  render() {
    console.log('props: ', this.props)

    return (<div>
      <button onClick={this.updateNeighborType}>Update Neighbor</button>
    </div>)
  }
}

const AppWithNeighborType = compose(
  graphql(mutation, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      updateNeighborType: todo => {
        props.mutate({
          variables: todo,
          optimisticResponse: {
            __typename: 'NeighborType',
            updateNeighborType: {
              ...todo,
              __typename: 'NeighborType'
            }
          },
        })
      }
    })
  }),
)(App)


export default withData(AppWithNeighborType)
