import React from 'react'
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import withData from '../withData'

const query = gql`
  query listNeighborTypes {
    listNeighborTypes {
      items{
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
  }
`

class App extends React.Component {

  render() {
    console.log('props: ', this.props)

    return (<div>

      <h2>Listing Neighbors</h2>
      {

        this.props.NeighborTypeTable.map((todo, index) => (

          <p> Name: {todo.name}<br/>
            City: {todo.city}<br/>
            State: {todo.state}<br/>
            NPI city ranking:{todo.npiCityRanking}<br/>
            NPI area ranking: {todo.npiAreaRanking}<br/>
            ReviewSummary: {todo.reviewSummary}<br/>
            Reviews: <ul>
              <li>schoolScore: {JSON.parse(todo.reviews).schoolScore}</li>
            </ul><br/>
            Question And Answer: <ul>
              <li>schoolScore: {JSON.parse(todo.questionAndAnswers).schoolScore}</li>
            </ul><br/>
            SimilarNeighborhoods: <ul>
              <li>schoolScore: {JSON.parse(todo.similarNeighborhoods).schoolScore}</li>
            </ul><br/>
            Top Agents: <ul>
              <li>schoolScore: {JSON.parse(todo.topAgents).schoolScore}</li>
            </ul><br/>
            Factors: <ul>
              <li>schoolScore: {JSON.parse(todo.factors).schoolScore}<br/></li>
            </ul>
            Keywords: <ul>
              <li>schoolScore: {JSON.parse(todo.keyWords).schoolScore}<br/></li>
            </ul>
            <hr/>
          </p>
        ))

      }

    </div>)
  }
}

const AppWithNeighborTypelist = compose(
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      NeighborTypeTable: props.data.listNeighborTypes ? props.data.listNeighborTypes.items : []
    })
  })
)(App)


export default withData(AppWithNeighborTypelist)
