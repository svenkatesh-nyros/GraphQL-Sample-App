import React from 'react';
import Head from 'next/head';

import gql from 'graphql-tag';
import {compose, graphql} from 'react-apollo';
import withData from '../withData';

const query = gql`
  query listProperties {
    listProperties{
      items {
        id
        age
        number_of_bedrooms
        number_of_bathrooms
        photos
      }
    }
  }
`;

const getSearchPropertyData = gql`
  query listProperties($age: Int!,$bathrooms: String!,$bedrooms: String!) {
    listProperties(filter: {
      age: {
        le: $age
      },number_of_bathrooms: {
        ge: $bathrooms
      },number_of_bedrooms: {
        ge: $bedrooms
      }
    }, limit: 100) {
      items {
        id
        age
        number_of_bedrooms
        number_of_bathrooms
        photos
      }
    }
  }
`;


class House extends React.Component {
  state = {
    propertyData: [],
    age: 99,
    bedrooms: '0',
    bathrooms: '0'
  };

  houseData() {

    this.props.getFilteredProperties({
      age: parseInt(this.state.age),
      bedrooms: this.state.bedrooms,
      bathrooms: this.state.bathrooms,
    }).then(data => {
      this.setState({
        propertyData: data
      });
    });
  }

  render() {

    return <div className="mainBody">
      <Head>
        <title>House Page</title>
        <meta name="description" content="Find properties with defined criteria"/>
        <meta name="keywords" content="property search, NovusLogics"/>
        <meta name="author" content="Louis Yun"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>

      <div className="mainTitle">
        <h2>House Page</h2>
      </div>

      <div className='container'>
        <div className="input">
          <input
            id="standard-with-placeholder"
            type="text"
            placeholder="Maximum age"
            className='textField'
            onChange={(e) => this.setState({age: e.target.value})}
          />
        </div>
        <div className="input">
          <input
            id="standard-with-placeholder"
            type="text"
            placeholder="Minimum # of bedrooms"
            className='textField'
            onChange={(e) => this.setState({bedrooms: e.target.value})}
          />
        </div>
        <div className="input">
          <input
            id="standard-with-placeholder"
            type='text'
            placeholder="Minimum # of bathrooms"
            className='textField'
            onChange={(e) => this.setState({bathrooms: e.target.value})}
          />
        </div>
        <button onClick={() => this.houseData()}>
          OK
        </button>
        <div>
          {this.state.propertyData.map(p => <div key={btoa(p.id)} className={'property'}>
            <p>Age: {p.age}</p>
            <p># of bedrooms: {p.number_of_bedrooms}</p>
            <p># of bathrooms: {p.number_of_bathrooms}</p>
            <p>Property images: {p.photos.map((img, index) => <img key={`${p.id}${index}`} src={img} style={{
              height: '100px',
              width: '100px',
              marginLeft: '10px'
            }}/>)}</p>
          </div>)}
        </div>
      </div>
      <style jsx>{`
      .mainTitle {
        color: blue;
      }

      .container {
        flex-direction: column;
        justify-content: center;
        margin-left: 5px;
      },

      .input {
        margin-top: 2px;
        margin-bottom: 2px;
      }

      .property {
        border: 1px solid #ABABAB;
        border-radius: 10px;
        padding: 10px;
        float: left;
        margin-right: 10px;
        margin-top: 10px;
      }
    `}</style>
    </div>;
  }

}

const filter = {
  'age': 0,
  'bathroom': '',
  'bedroom': ''
};

export default compose(
  withData,
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      properties: props.data.listProperties && props.data.listProperties.items ? props.data.listProperties.items : [],
      getProperties: params => {
        return props.data.refetch(params).then(data => {
          return data.data.listProperties && data.data.listProperties.items ? data.data.listProperties.items : [];
        }).catch(err => err);
      }
    })
  }),
  graphql(getSearchPropertyData, {
    options: {
      fetchPolicy: 'cache-and-network',
      variables: {
        age: 99,
        bathrooms: '0',
        bedrooms: '0',
      }
    },
    props: props => ({
      properties1: props.data.listProperties && props.data.listProperties.items ? props.data.listProperties.items : [],
      getFilteredProperties: params => {
        return props.data.refetch(params).then(data => {
          return data.data.listProperties && data.data.listProperties.items ? data.data.listProperties.items : [];
        }).catch(err => err);
      }
    })
  }),
)(House);

