import React, {Component} from 'react';

import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import {from} from 'zen-observable';
import withData from '../withData';


//For testing static data start

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
//For testing static data wrap

//Add GQL
const GQLAddNeaghborhood = gql`
    mutation  addNeighborhood($name: String, $city: String, $state: String, $npiCityRanking: Int, $npiCityRanking: Int, $npiAreaRanking: Int, $reviewSummary: String!, $reviews: String!,$questionAndAnswers: String!,$similarNeighborhoods: String!,$topAgents: String!,$factors: String!,$keyWords: String!){
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
`;

//Update GQL
const GQLUpdateNeaghborhood = gql`
    mutation  updateNeighborhood($id: String!, $name: String){
      updateNeighborType(input: {
      id: $id  
      name: $name
    }) {
      id
      name
    }
    }
`;

//Delete GQL
const GQLDeleteNeaghborhood = gql`
mutation deleteNeighborhood($id: String!) {
    deleteNeighborType(input: {
        id: $id        
      }) {
        id
      }
      }
  `
//List GQL
const query = gql`
  query listNeighborTypes{
    listNeighborTypes(limit: 10){
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

//List GQL by ID
const getneighborbyid = gql`
query getNeighborType{
      getNeighborType(id:"a8a3272d-d8da-455f-9b35-b81f373f325e"){
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

class Neighborhood extends Component {

  constructor(props) {
    super(props);
    this.id = '';
    this.name = '';
    this.city = '';
    this.state = '';
    this.npiCityRanking = '';
    this.npiAreaRanking = '';
    this.reviewSummary = '';
    this.reviews = '';
    this.questionAndAnswers = '';
    this.similarNeighborhoods = '';
    this.topAgents = '';
    this.factors = '';
    this.keyWords = '';
    this.objNeighborhood = {};
    this.objUpdateNeighborhood = {};
    this.objDeleteNeighborhood = {};
  }

  /*   Test case
  id;
  name;
  city;
  state;
  npiCityRanking;
  npiAreaRanking;
  reviewSummary;
  reviews;
  questionAndAnswers;
  similarNeighborhoods;
  topAgents;
  factors;
  keyWords;
  objNeighborhood;
  objUpdateNeighborhood;
  objDeleteNeighborhood;

setNeighorhoodDetails = (NeighorhoodDetails) =>{
  //this.id = "";
  this.name = NeighorhoodDetails.name;
  this.city = NeighorhoodDetails.city;;
  this.state = NeighorhoodDetails.name;;
  this.npiCityRanking =NeighorhoodDetails.name;;
  this.npiAreaRanking = NeighorhoodDetails.name;;
  this.reviewSummary = NeighorhoodDetails.name;;
  this.reviews = NeighorhoodDetails.name;;
  this.questionAndAnswers =NeighorhoodDetails.name;;
  this.similarNeighborhoods = NeighorhoodDetails.name;;
  this.topAgents =NeighorhoodDetails.name;;
  this.factors= NeighorhoodDetails.name;;
  this.keyWords = NeighorhoodDetails.name;;
  this.objNeighborhood ={};
  this.objUpdateNeighborhood={};
  this.objDeleteNeighborhood={};
}
*/
  //Add Neighbor Function
  addNeighborhood = () => {

    this.objNeighborhood = {

      /*name: this.name,
      city: this.city,
      state: this.state,
      npiCityRanking:  this.npiCityRanking,
      npiAreaRanking: this.npiAreaRanking,
      reviewSummary: this.reviewSummary,
      reviews: this.reviews,
      questionAndAnswers: this.questionAndAnswers,
      similarNeighborhoods: this.similarNeighborhoods,
      topAgents: this.topAgents,
      factors: this.factors,
      keyWords: this.keyWords,*/
      name: 'Rakesh',
      city: 'Gujarat',
      state: 'canda',
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
    this.props.addNeighborhood(this.objNeighborhood);
    this.objNeighborhood = {};
  }

  //Update Neighbor Function
  updateNeighborhood = () => {

    this.objUpdateNeighborhood = {
      id: 'a8a3272d-d8da-455f-9b35-b81f373f325e',
      name: 'laura new',

    }
    this.props.updateNeighborhood(this.objUpdateNeighborhood);
    this.objUpdateNeighborhood = {};
  }

  //Delete Neighbor Function
  deleteNeighborhood = () => {

    this.objDeleteNeighborhood = {
      id: 'a8a3272d-d8da-455f-9b35-b81f373f325e'
    }
    this.props.deleteNeighborhood(this.objDeleteNeighborhood);
    this.objDeleteNeighborhood = {};
  }


  render() {
    console.log('props: ', this.props)

    return (
      <div>
        <button onClick={this.addNeighborhood}>Create Neighbor</button>
        &nbsp;
        <button onClick={this.updateNeighborhood}>Update Neighbor</button>
        &nbsp;
        <button onClick={this.deleteNeighborhood}>Delete Neighbor</button>
        <h2>Listing Neighbors</h2>
        {

          this.props.NeighborTypeTable.map((listdata, index) => (

            <p> Name: {listdata.name}<br/>
              City: {listdata.city}<br/>
              <hr/>
            </p>
          ))


        }

      </div>)

  }


}

/* Test case

class abc extends Component{

  constructor(props){
    super(props);
    this.NeighborhoodRef = React.createRef();
  }

  testad = () => {
    
    this.NeighborhoodRef.current.setNeighorhoodDetails(NeighorhoodDetails);
    this.NeighborhoodRef.current.addNeighorhood();

  }

}

<Neighborhood ref={this.NeighborhoodRef} />
*/

const AppWithNeighborhoodGraphQueries = compose(
  //Add Neighbor
  graphql(GQLAddNeaghborhood, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      addNeighborhood: objNeighborhood => {
        props.mutate({
          variables: objNeighborhood,
          optimisticResponse: {
            __typename: 'NeighborType',
            createNeighborType: {
              ...objNeighborhood,
              __typename: 'NeighborType'
            }
          },
        })
      },

    })
  }),

  //Update Neighbor
  graphql(GQLUpdateNeaghborhood, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      updateNeighborhood: objUpdateNeighborhood => {
        props.mutate({
          variables: objUpdateNeighborhood,
          optimisticResponse: {
            __typename: 'NeighborType',
            updateNeighborType: {
              ...objUpdateNeighborhood,
              __typename: 'NeighborType'
            }
          },
        })
      },

    })
  }),

  //Delete Neighbor
  graphql(GQLDeleteNeaghborhood, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      deleteNeighborhood: objDeleteNeighborhood => {
        props.mutate({
          variables: objDeleteNeighborhood,
          optimisticResponse: {
            __typename: 'NeighborType',
            deleteNeighborType: {
              ...objDeleteNeighborhood,
              __typename: 'NeighborType'
            }
          },
        })
      },

    })
  }),

  //Listing Neighbor
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      NeighborTypeTable: props.data.listNeighborTypes ? props.data.listNeighborTypes.items : []
    })
  }),
)(Neighborhood)


export default withData(AppWithNeighborhoodGraphQueries)
