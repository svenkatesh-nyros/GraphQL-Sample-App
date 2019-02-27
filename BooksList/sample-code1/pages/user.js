import React from 'react';
import Head from 'next/head';

import gql from 'graphql-tag';
import {compose, graphql} from 'react-apollo';
import withData from '../withData';


const getUserByName = gql`
  query listUsers($name: String!) {
    listUsers(filter: {
      name: {
        eq: $name
      }
    }, limit: 100){
      items {
        id
        name
        age
        weight
        photos
      }
    }
  }
`;

class User extends React.Component {
  state = {
    userData: [],
    name: ''
  };

  userData() {
    this.props.getFilteredUser({
      name: this.state.name,
    }).then(data => {
      this.setState({
        userData: data
      });
    });
  }

  render() {
    return <div className="mainBody">
      <Head>
        <title>Users Page</title>
        <meta name="description" content="Find users with defined criteria"/>
        <meta name="keywords" content="user search, Rob Yau, Louis Yun"/>
        <meta name="author" content="Mayur Padshala"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <div className="mainTitle">
        <h2>User Page</h2>
      </div>
      <form className={'container'}>
        <div>
          <input
            id="standard-with-placeholder"
            type="text"
            placeholder="User Name"
            onChange={(e) => this.setState({name: e.target.value})}
          />
        </div>
      </form>
      <div>

        <input type="button" onClick={() => this.userData()} value="Next"/>
        {this.state.userData.map(p => <div key={p.id}>
          <p>Age: {p.age}</p>
          <p>Weight: {p.weight}</p>
          <div>Property images: {<img src={p.photos} style={{height: '100px', width: '100px'}}/>}</div>
        </div>)}

      </div>
      <style jsx>{`
      .mainTitle {
         display:flex;
         flex:1;
         justify-content: center
      }

      .mainBody {
         padding:20px;
      }

      .container {
        display: flex,
        flex-direction: column
      }
    `}</style>
    </div>;
  }
}

export default compose(
  withData,
  graphql(getUserByName, {
    options: {
      fetchPolicy: 'cache-and-network',
      variables: {
        age: '',
        bathrooms: '',
        bedrooms: '',
      }
    },
    props: props => ({
      userData: props.data.listUsers ? props.data.listUsers.items : [],
      getFilteredUser: params => {
        return props.data.refetch(params).then(data => {
          return data.data.listUsers ? data.data.listUsers.items : [];
        }).catch(err => err);
      }
    })
  }),
)(User);


