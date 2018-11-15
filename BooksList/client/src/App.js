import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList.js';
import AddBook from './components/AddBook.js';
import BookDetails from './components/BookDetails.js';

// apollo client setup code
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Books List</h1>
          <BookList />
          <AddBook />

        </div>
      </ApolloProvider>
    );
  }
}

export default App;
