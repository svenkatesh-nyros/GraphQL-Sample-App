import React from 'react'
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import withData from '../withData'
import debounce from 'lodash/debounce'


const SearchNeighborTypes = gql`
  query($searchQuery: String) {
    listNeighborTypes(filter: {
      name: {
        contains: $searchQuery
      }
    }) {
      items {
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
const listNeighborTypes = gql`
  query {
    listNeighborTypes {
      items {
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

  state = {
    searchQuery: ''
  }
  onChange = (e) => {
    const value = e.target.value
    this.handleFilter(value)
  }
  handleFilter = debounce((val) => {
    this.props.onSearch(val)
  }, 250)

  render() {

    const {loading} = this.props.data
    const {items} = this.props.data.listNeighborTypes
    return (
      <div className="App">
        <input
          style={styles.input}
          onChange={this.onChange.bind(this)}
          placeholder='Enter Neighbor Name For Search'
        />
        {
          !!loading && (
            <p>Searching...</p>
          )
        }
        {
          !loading && !items.length && (
            <p>Sorry, no results.</p>
          )
        }
        {
          !loading && items.map((item, index) => (
            <div key={index} style={styles.container}>
              <p style={styles.title}>{item.name}</p>
              <p style={styles.description}>{item.city}</p>
            </div>
          ))
        }
      </div>
    );
  }
}


const AppWithSearchNeighborTypes = compose(
  graphql(listNeighborTypes, {
    options: data => ({
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      onSearch: searchQuery => {
        return props.data.fetchMore({
          query: searchQuery === '' ? listNeighborTypes : SearchNeighborTypes,
          variables: {
            searchQuery
          },
          updateQuery: (previousResult, {fetchMoreResult}) => ({
            ...previousResult,
            listNeighborTypes: {
              ...previousResult.listNeighborTypes,
              items: fetchMoreResult.listNeighborTypes.items
            }
          })
        })
      },
      data: props.data
    })
  })
)(App);
const styles = {
  container: {
    padding: 10,
    borderBottom: '1px solid #ddd'
  },
  title: {
    fontSize: 18
  },
  description: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, .5)'
  },
  input: {
    height: 40,
    width: 300,
    padding: 7,
    fontSize: 15,
    outline: 'none'
  }
}

export default withData(AppWithSearchNeighborTypes)
