import React, {Component} from 'react';
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import {from} from 'zen-observable';
import withData from '../withData';


//Add NeighborReview Query
const GQLAddNeighbourReview = gql`
    mutation addNeighbourReview($author: String, $createDate: String, $helpfulCount: Int, $heading: String, $description: String, $communityRating: Int, $downtownRating: Int, $curbAppealRating: Int, $jobsRating: Int, $keyWords: String){
        createMyNeighbourReviewType(input: {
            author: $author
            createDate: $createDate
            helpfulCount: $helpfulCount
            heading: $heading
            description: $description
            communityRating: $communityRating
            downtownRating: $downtownRating
            curbAppealRating: $curbAppealRating
            jobsRating: $jobsRating
            keyWords: $keyWords
            
    }) {
            id
            author
            createDate
            helpfulCount
            heading
            description
            communityRating
            downtownRating
            curbAppealRating
            jobsRating
            keyWords
    }
    }
`;

//Update NeighborReview Query
const GQLUpdateNeighbourReview = gql`
    mutation updateNeighbourReview($id: String!, $author: String){
      updateMyNeighbourReviewType(input: {
      id: $id  
      author: $author
    }) {
      id
      author
    }
    }
`;

//Delete NeighborReview Query
const GQLDeleteNeighbourReview = gql`
mutation deleteNeighbourReview($id: String!) {
  deleteMyNeighbourReviewType(input: {
        id: $id        
      }) {
        id
      }
      }
  `;

//List NeighborReview Query
const query = gql`
query listMyNeighbourReviewTypes{
  listMyNeighbourReviewTypes(limit: 10){
    items{
        id
        author
        createDate
        helpfulCount
        heading
        description
        communityRating
        downtownRating
        curbAppealRating
        jobsRating
        keyWords
    }
  }
}
`;

//List NeighbourReviews by ID
const getNeighbourReviewbyid = gql`
query getNeighbourReviewType{
      getNeighbourReviewType(id:"9f9d2686-ae02-4d23-a35a-4a6233dd2492"){
        id
        author
        createDate
        helpfulCount
        heading
        description
        communityRating
        downtownRating
        curbAppealRating
        jobsRating
        keyWords
      }
    
}
`


class NeighbourReviewdata extends Component {
  constructor(props) {
    super(props);
    this.author = '';
    this.createDate = '';
    this.helpfulCount = '';
    this.heading = '';
    this.description = '';
    this.communityRating = '';
    this.downtownRating = '';
    this.curbAppealRating = '';
    this.jobsRating = '';
    this.keyWords = '';

    this.objAddNeighbourReview = {};
    this.objUpdateNeighbourReview = {};
    this.objDeleteNeighbourReview = {};
  }

  //Add NeighborReview Function
  addNeighbourReview = () => {

    this.objAddNeighbourReview = {
      /*createDate= this.createDate,
      helpfulCount= this.helpfulCount,
      heading= this.heading,
      description= this.description,
      communityRating= this.communityRating,
      downtownRating= this.downtownRating,
      curbAppealRating= this.curbAppealRating,
      jobsRating= this.jobsRating,
      keyWords= this.keyWords,
      */
      author: 'jeff',
      createDate: '22-12-2017',
      helpfulCount: 5,
      heading: 'New House Review',
      description: 'It is Very Nice!',
      communityRating: 8,
      downtownRating: 5,
      curbAppealRating: 10,
      jobsRating: 6,
      keyWords: 'New, Old',

    }
    this.props.addNeighbourReview(this.objAddNeighbourReview);
    this.objAddNeighbourReview = {};
  }

  //Update NeighborReview Function
  updateNeighbourReview = () => {

    this.objUpdateNeighbourReview = {
      id: '9f9d2686-ae02-4d23-a35a-4a6233dd2492',
      author: 'Charlie',

    }
    this.props.updateNeighbourReview(this.objUpdateNeighbourReview);
    this.objUpdateNeighbourReview = {};
  }

  //Delete NeighborReview Function
  deleteNeighbourReview = () => {

    this.objDeleteNeighbourReview = {
      id: '9f9d2686-ae02-4d23-a35a-4a6233dd2492'
    }
    this.props.deleteNeighbourReview(this.objDeleteNeighbourReview);
    this.objDeleteNeighbourReview = {};
  }


  render() {
    console.log('props: ', this.props)

    return (<div>

      <button onClick={this.addNeighbourReview}>Add Review</button>
      <button onClick={this.updateNeighbourReview}>Update Review</button>
      <button onClick={this.deleteNeighbourReview}>Delete Review</button>

      <h2>Listing Review</h2>
      {

        this.props.MyNeighbourReviewTypeTable.map((NeighbourReview, index) => (

          <p> Author: {NeighbourReview.author}<br/>
            Description: {NeighbourReview.description}<br/>
            <hr/>
          </p>
        ))


      }

    </div>)
  }

}

const AppWithNeighbourReviewGraphQueries = compose(
  //Add NeighborReview
  graphql(GQLAddNeighbourReview, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      addNeighbourReview: objAddNeighbourReview => {
        props.mutate({
          variables: objAddNeighbourReview,
          optimisticResponse: {
            __typename: 'NeighbourReview',
            createMyNeighbourReviewType: {
              ...objAddNeighbourReview,
              __typename: 'NeighbourReview'
            }
          },
        })
      },

    })
  }),

  //Update NeighborReview
  graphql(GQLUpdateNeighbourReview, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      updateNeighbourReview: objUpdateNeighbourReview => {
        props.mutate({
          variables: objUpdateNeighbourReview,
          optimisticResponse: {
            __typename: 'NeighbourReview',
            updateMyNeighbourReviewType: {
              ...objUpdateNeighbourReview,
              __typename: 'NeighbourReview'
            }
          },
        })
      },

    })
  }),

  //Delete NeighborReview
  graphql(GQLDeleteNeighbourReview, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      deleteNeighbourReview: objDeleteNeighbourReview => {
        props.mutate({
          variables: objDeleteNeighbourReview,
          optimisticResponse: {
            __typename: 'NeighbourReview',
            deleteMyNeighbourReviewType: {
              ...objDeleteNeighbourReview,
              __typename: 'NeighbourReview'
            }
          },
        })
      },

    })
  }),

  //Listing NeighborReview
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      MyNeighbourReviewTypeTable: props.data.listMyNeighbourReviewTypes ? props.data.listMyNeighbourReviewTypes.items : []
    })
  }),
)(NeighbourReviewdata)


export default withData(AppWithNeighbourReviewGraphQueries)
