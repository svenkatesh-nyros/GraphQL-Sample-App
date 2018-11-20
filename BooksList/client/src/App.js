import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList.js';

import BookDetails from './components/BookDetails.js';


// apollo client setup code
const client = new ApolloClient({
  uri: 'http://10.90.90.63:4000/graphql',
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Books List</h1>
          <BookList />
          
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
