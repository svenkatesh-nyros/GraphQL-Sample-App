import React, {Component} from 'react';

import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import {from} from 'zen-observable';
import withData from '../withData';


//Add User Query
const GQLAdduser = gql`
    mutation addUser($type: String, $firstName: String, $lastName: String,	$email: String,	$password: String, $photos: String,	$aboutMe: String, $numberNeighborhoodsReviewed: Int, $like: Int, $questionsAnswered: Int, $point: Int, $neighborhoodsReviewed: String){
        createMyUserType(input: {
        type: $type
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        photos: $photos
        aboutMe: $aboutMe
        numberNeighborhoodsReviewed: $numberNeighborhoodsReviewed
        like: $like
        questionsAnswered: $questionsAnswered
        point: $point
        neighborhoodsReviewed: $neighborhoodsReviewed
    }) {
        id
        type
        firstName
        lastName
        email
        password
        photos
        aboutMe
        numberNeighborhoodsReviewed
        like
        questionsAnswered
        point
        neighborhoodsReviewed  
    }
    }
`;

//Update User Query
const GQLUpdateuser = gql`
    mutation updateUser($id: ID!, $firstName: String){
      updateMyUserType(input: {
      id: $id  
      firstName: $firstName
    }) {
      id
      firstName
    }
    }
`;

//Delete User Query
const GQLDeleteUser = gql`
mutation deleteUser($id: ID!) {
  deleteMyUserType(input: {
        id: $id        
      }) {
        id
      }
      }
  `;

//List User Query
const query = gql`
query listMyUserTypes{
  listMyUserTypes(limit: 10){
    items{
      id
      type
      firstName
      lastName
      email
      password
      photos
      aboutMe
      numberNeighborhoodsReviewed
      like
      questionsAnswered
      point
      neighborhoodsReviewed  
    }
  }
}
`;

//List Users by ID
const getneighborbyid = gql`
query getNeighborType{
      getNeighborType(id:"4a20ecbc-8b1e-47bf-a45f-3ed2ef8bee7a"){
      id
      type
      firstName
      lastName
      email
      password
      photos
      aboutMe
      numberNeighborhoodsReviewed
      like
      questionsAnswered
      point
      neighborhoodsReviewed  
      }
    
}
`


class Userdata extends Component {
  constructor(props) {
    super(props);
    this.id = '';
    this.type = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.photos = '';
    this.aboutMe = '';
    this.numberNeighborhoodsReviewed = '';
    this.like = '';
    this.questionsAnswered = '';
    this.point = '';
    this.neighborhoodsReviewed = '';

    this.objAddUser = {};
    this.objUpdateUser = {};
    this.objDeleteUser = {};
  }

  //Add User Function
  addUser = () => {

    this.objAddUser = {
      /*type: this.type,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password :this.password,
      photos: this.photos,
      aboutMe: this.aboutMe,
      numberNeighborhoodsReviewed: this.numberNeighborhoodsReviewed,
      like: this.like,
      questionsAnswered: this.questionsAnswered,
      point: this.point,
      neighborhoodsReviewed: this.neighborhoodsReviewed,*/
      type: 'Homebuyer',
      firstName: 'Rakesh',
      lastName: 'Patel',
      email: 'paterakesh12345@gmail.com',
      password: 'rakesh123',
      photos: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png',
      aboutMe: 'I am React Developer',
      numberNeighborhoodsReviewed: 8,
      like: 45,
      questionsAnswered: 10,
      point: 80,
      neighborhoodsReviewed: 'Nice Place'

    }
    this.props.addUser(this.objAddUser);
    this.objAddUser = {};
  }

  //Update User Function
  updateUser = () => {

    this.objUpdateUser = {
      id: '4a20ecbc-8b1e-47bf-a45f-3ed2ef8bee7a',
      firstName: 'Rakesh P',

    }
    this.props.updateUser(this.objUpdateUser);
    this.objUpdateUser = {};
  }

  //Delete User Function
  deleteUser = () => {

    this.objDeleteUser = {
      id: '4a20ecbc-8b1e-47bf-a45f-3ed2ef8bee7a'
    }
    this.props.deleteUser(this.objDeleteUser);
    this.objDeleteUser = {};
  }


  render() {
    console.log('props: ', this.props)

    return (<div>

      <button onClick={this.addUser}>Add User</button>
      &nbsp;
      <button onClick={this.updateUser}>Update User</button>
      &nbsp;
      <button onClick={this.deleteUser}>Delete User</button>

      <h2>Listing Users</h2>
      {

        this.props.MyUserTypeTable.map((listuser, index) => (

          <p> Name: {listuser.firstName}<br/>
            City: {listuser.lastName}<br/>
            <hr/>
          </p>
        ))


      }

    </div>)
  }

}

const AppWithUserGraphQueries = compose(
  //Add User
  graphql(GQLAdduser, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      addUser: objAddUser => {
        props.mutate({
          variables: objAddUser,
          optimisticResponse: {
            __typename: 'UserType',
            createMyUserType: {
              ...objAddUser,
              __typename: 'UserType'
            }
          },
        })
      },

    })
  }),

  //Update User
  graphql(GQLUpdateuser, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      updateUser: objUpdateUser => {
        props.mutate({
          variables: objUpdateUser,
          optimisticResponse: {
            __typename: 'UserType',
            updateMyUserType: {
              ...objUpdateUser,
              __typename: 'UserType'
            }
          },
        })
      },

    })
  }),

  //Delete User
  graphql(GQLDeleteUser, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      deleteUser: objDeleteUser => {
        props.mutate({
          variables: objDeleteUser,
          optimisticResponse: {
            __typename: 'UserType',
            deleteMyUserType: {
              ...objDeleteUser,
              __typename: 'UserType'
            }
          },
        })
      },

    })
  }),

  //Listing User
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      MyUserTypeTable: props.data.listMyUserTypes ? props.data.listMyUserTypes.items : []
    })
  }),
)(Userdata)


export default withData(AppWithUserGraphQueries)
