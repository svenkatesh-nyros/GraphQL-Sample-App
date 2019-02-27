import React from 'react'
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import withData from '../withData'

let factors = {
  schoolScore: 10,
  crimeRate: 10,
  walkability: 10,
  community: 10,
  curbAppeal: 10,
  price: 10,
};

const factorsJSON = JSON.stringify(factors);

let reviews = {
  schoolScore: 10,
  crimeRate: 10,
  walkability: 10,
  community: 10,
  curbAppeal: 10,
  price: 10,
};

const reviewsJSON = JSON.stringify(reviews);


let questionAndAnswers = {
  schoolScore: 10,
  crimeRate: 10,
  walkability: 10,
  community: 10,
  curbAppeal: 10,
  price: 10,
};

const questionAndAnswersJSON = JSON.stringify(questionAndAnswers);

let similarNeighborhoods = {
  schoolScore: 10,
  crimeRate: 10,
  walkability: 10,
  community: 10,
  curbAppeal: 10,
  price: 10,
};

const similarNeighborhoodsJSON = JSON.stringify(similarNeighborhoods);

let topAgents = {
  schoolScore: 10,
  crimeRate: 10,
  walkability: 10,
  community: 10,
  curbAppeal: 10,
  price: 10,
};

const topAgentsJSON = JSON.stringify(topAgents);


let keyWords = {
  schoolScore: 10,
  crimeRate: 10,
  walkability: 10,
  community: 10,
  curbAppeal: 10,
  price: 10,
};

const keyWordsJSON = JSON.stringify(keyWords);


const mutation = gql`
mutation  createNeighborType($name: String, $city: String, $state: String, $npiCityRanking: Int, $npiCityRanking: Int, $npiAreaRanking: Int, $reviewSummary: String!, $reviews: String!,$questionAndAnswers: String!,$similarNeighborhoods: String!,$topAgents: String!,$factors: String!,$keyWords: String!){
    createNeighborType(input: {
      name: $name
      city: $city
      state: $state
      npiCityRanking: $npiCityRanking
      npiAreaRanking: $npiAreaRanking
      reviewSummary: $reviewSummary
      reviews: $reviews
      questionAndAnswers: $questionAndAnswers
      similarNeighborhoods: $similarNeighborhoods
      topAgents: $topAgents
      factors: $factors
      keyWords: $keyWords
      
     
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
  createNeighborType = () => {

    const todo = {
      name: 'Rakeshnew',
      city: 'Ahmedabad',
      state: 'Gujarat',
      npiCityRanking: 10,
      npiAreaRanking: 5555,
      reviewSummary: 'Testing',
      reviews: reviewsJSON,
      questionAndAnswers: questionAndAnswersJSON,
      similarNeighborhoods: similarNeighborhoodsJSON,
      topAgents: topAgentsJSON,
      factors: factorsJSON,
      keyWords: keyWordsJSON,

    }
    this.props.createNeighborType(todo)
    this.setState({
      todo: ''
    })
  }

  render() {
    console.log('props: ', this.props)

    return (<div>
      <button onClick={this.createNeighborType}>Create Neighbor</button>
    </div>)
  }
}

const AppWithNeighborType = compose(
  graphql(mutation, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      createNeighborType: todo => {
        props.mutate({
          variables: todo,
          optimisticResponse: {
            __typename: 'NeighborType',
            createNeighborType: {
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
