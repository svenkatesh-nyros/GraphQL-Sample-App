import React, {Component} from 'react';
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import {from} from 'zen-observable';
import withData from '../withData';

//Add PostData Query
const GQLAddPostData = gql`
    mutation addPostData($poster: String, $content: String, $createDate: String){
        createMyPostDataType(input: {
            poster: $poster
            content: $content
            createDate: $createDate
            
    }) {
            id
            poster
            content
            createDate
    }
    }
`;

//Update PostData Query
const GQLUpdatePostData = gql`
    mutation updatePostData($id: ID!, $content: String){
      updateMyPostDataType(input: {
      id: $id  
      content: $content
    }) {
      id
      content
    }
    }
`;

//Delete PostData Query
const GQLDeletePostData = gql`
mutation deletePostData($id: ID!) {
  deleteMyPostDataType(input: {
        id: $id        
      }) {
        id
      }
      }
  `;

//List PostData Query
const query = gql`
query listMyPostDataTypes{
  listMyPostDataTypes(limit: 10){
    items{
        id
        poster
        content
        createDate
    }
  }
}
`;

//List PostDatas by ID
const getPostDatabyid = gql`
query getPostDataType{
      getPostDataType(id:"853fc70c-48f7-4ccf-af32-4b97ddc0fa06"){
        id
        poster
        content
        createDate
      }
    
}
`

class PostDatadata extends Component {
  constructor(props) {
    super(props);
    this.poster = '';
    this.content = '';
    this.createDate = '';

    this.objAddPostData = {};
    this.objUpdatePostData = {};
    this.objDeletePostData = {};
  }

  //Add PostData Function
  addPostData = () => {

    this.objAddPostData = {
      /*poster= this.poster, 
        content= this.content,
        createDate= this.createDate
      */
      poster: 'Loius',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
      createDate: '04-05-2018'

    }
    this.props.addPostData(this.objAddPostData);
    this.objAddPostData = {};
  }

  //Update PostData Function
  updatePostData = () => {

    this.objUpdatePostData = {
      id: '853fc70c-48f7-4ccf-af32-4b97ddc0fa06',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',

    }
    this.props.updatePostData(this.objUpdatePostData);
    this.objUpdatePostData = {};
  }

  //Delete PostData Function
  deletePostData = () => {

    this.objDeletePostData = {
      id: '853fc70c-48f7-4ccf-af32-4b97ddc0fa06'
    }
    this.props.deletePostData(this.objDeletePostData);
    this.objDeletePostData = {};
  }


  render() {
    console.log('props: ', this.props)

    return (<div>

      <button onClick={this.addPostData}>Add PostData</button>
      <button onClick={this.updatePostData}>Update PostData</button>
      <button onClick={this.deletePostData}>Delete PostData</button>

      <h2>Listing PostData</h2>
      {

        this.props.MyPostDataTypeTable.map((PostData, index) => (

          <p> Poster: {PostData.poster}<br/>
            Content: {PostData.content}<br/>
            <hr/>
          </p>
        ))


      }

    </div>)
  }

}

const AppWithPostDataGraphQueries = compose(
  //Add PostData
  graphql(GQLAddPostData, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      addPostData: objAddPostData => {
        props.mutate({
          variables: objAddPostData,
          optimisticResponse: {
            __typename: 'PostData',
            createMyPostDataType: {
              ...objAddPostData,
              __typename: 'PostData'
            }
          },
        })
      },

    })
  }),

  //Update PostData
  graphql(GQLUpdatePostData, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      updatePostData: objUpdatePostData => {
        props.mutate({
          variables: objUpdatePostData,
          optimisticResponse: {
            __typename: 'PostData',
            updateMyPostDataType: {
              ...objUpdatePostData,
              __typename: 'PostData'
            }
          },
        })
      },

    })
  }),

  //Delete PostData
  graphql(GQLDeletePostData, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      deletePostData: objDeletePostData => {
        props.mutate({
          variables: objDeletePostData,
          optimisticResponse: {
            __typename: 'PostData',
            deleteMyPostDataType: {
              ...objDeletePostData,
              __typename: 'PostData'
            }
          },
        })
      },

    })
  }),

  //Listing PostData
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      MyPostDataTypeTable: props.data.listMyPostDataTypes ? props.data.listMyPostDataTypes.items : []
    })
  }),
)(PostDatadata)


export default withData(AppWithPostDataGraphQueries)
