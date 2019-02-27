import React, {Component} from 'react';
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import {from} from 'zen-observable';
import withData from '../withData';

let propertyType = {
  house: 10,
  condo: 10,
  townhouse: 10,
  multifamily: 10,
  land: 10,
  other: 10,
};

const propertyTypeJSON = JSON.stringify(propertyType);

let homestatus = {
  active: 1,
  pending: 2,
  sold: 3
}

const homestatusTypeJSON = JSON.stringify(homestatus);

//Add User Query
const GQLAddhome = gql`
    mutation addHome($address: String, $price: Int, $propertyType: String, $status: String, $mlsNumber: String, $openHouse: String, $listingAgent: String, $listingBroker: String, $sellingAgent: String, $sellingBroker: String, $description: String, $bedCount: Int, $bathCount: Int, $neighborhood: String, $county: String, $squareFeet: Int, $lotSize: Int,$yearBuilt: Int, $hoaFees: Boolean, $soldDate: String, $history: String, $elementarySchool: String, $middleSchool: String, $highSchool: String, $photos: String){
        createMyHomeType(input: {
            address: $address
            price: $price
            propertyType: $propertyType
            status: $status
            mlsNumber: $mlsNumber
            openHouse: $openHouse
            listingAgent: $listingAgent
            listingBroker: $listingBroker
            sellingAgent: $sellingAgent
            sellingBroker: $sellingBroker
            description: $description
            bedCount: $bedCount
            bathCount: $bathCount
            neighborhood: $neighborhood
            county: $county
            squareFeet: $squareFeet
            lotSize: $lotSize
            yearBuilt: $yearBuilt
            hoaFees: $hoaFees
            soldDate: $soldDate
            history: $history
            elementarySchool: $elementarySchool
            middleSchool: $middleSchool
            highSchool: $highSchool
            photos: $photos
            
    }) {
            id
            address
            price
            propertyType
            status
            mlsNumber
            openHouse
            listingAgent
            listingBroker
            sellingAgent
            sellingBroker
            description
            bedCount
            bathCount
            neighborhood
            county
            squareFeet
            lotSize
            yearBuilt
            hoaFees
            soldDate
            history
            elementarySchool
            middleSchool
            highSchool
            photos
  
    }
    }
`;

//Update User Query
const GQLUpdatehome = gql`
    mutation updateHome($id: String!, $price: Int){
      updateMyHomeType(input: {
      id: $id  
      price: $price
    }) {
      id
      price
    }
    }
`;

//Delete User Query
const GQLDeleteHome = gql`
mutation deleteHome($id: String!) {
  deleteMyHomeType(input: {
        id: $id        
      }) {
        id
      }
      }
  `;

//List User Query
const query = gql`
query listMyHomeTypes{
  listMyHomeTypes(limit: 10){
    items{
        id
        address
        price
        propertyType
        status
        mlsNumber
        openHouse
        listingAgent
        listingBroker
        sellingAgent
        sellingBroker
        description
        bedCount
        bathCount
        neighborhood
        county
        squareFeet
        lotSize
        yearBuilt
        hoaFees
        soldDate
        history
        elementarySchool
        middleSchool
        highSchool
        photos  
    }
  }
}
`;

//List Users by ID
const gethomebyid = gql`
query getHomeType{
      getHomeType(id:"41f0e3f5-e8e1-47c4-863e-c7ebc39b86cf"){
        id
        address
        price
        propertyType
        status
        mlsNumber
        openHouse
        listingAgent
        listingBroker
        sellingAgent
        sellingBroker
        description
        bedCount
        bathCount
        neighborhood
        county
        squareFeet
        lotSize
        yearBuilt
        hoaFees
        soldDate
        history
        elementarySchool
        middleSchool
        highSchool
        photos 
      }
    
}
`


class Homedata extends Component {
  constructor(props) {
    super(props);
    this.address = '';
    this.price = '';
    this.propertyType = '';
    this.status = '';
    this.mlsNumber = '';
    this.openHouse = '';
    this.listingAgent = '';
    this.listingBroker = '';
    this.sellingAgent = '';
    this.sellingBroker = '';
    this.description = '';
    this.bedCount = '';
    this.bathCount = '';
    this.neighborhood = '';
    this.county = '';
    this.squareFeet = '';
    this.lotSize = '';
    this.yearBuilt = '';
    this.hoaFees = '';
    this.soldDate = '';
    this.history = '';
    this.elementarySchool = '';
    this.middleSchool = '';
    this.highSchool = '';
    this.photos = '';

    this.objAddHome = {};
    this.objUpdateHome = {};
    this.objDeleteHome = {};
  }

  //Add User Function
  addHome = () => {

    this.objAddHome = {
      /*address=this.address,
          price=this.price,
          propertyType=this.price,
          status=this.status,
          mlsNumber=this.mlsNumber,
          openHouse=this.openHouse,
          listingAgent=this.listingAgent,
          listingBroker=this.listingBroker,
          sellingAgent=this.sellingAgent,
          sellingBroker=this.sellingBroker,
          description=this.description,
          bedCount=this.bedCount,
          bathCount=this.bathCount,
          neighborhood=this.neighborhood,
          county=this.county,
          squareFeet=this.squareFeet,
          lotSize=this.lotSize,
          yearBuilt=this.yearBuilt,
          hoaFees=this.hoaFees,
          soldDate=this.soldDate,
          history=this.history,
          elementarySchool=this.elementarySchool,
          middleSchool=this.middleSchool,
          highSchool=this.highSchool,
          photos=this.photos*/
      address: 'Street 1010 EASY ST, Canda',
      price: 30,
      propertyType: propertyType,
      status: homestatus,
      mlsNumber: '50',
      openHouse: '20-12-1998, 05-12-2018',
      listingAgent: 'Andrew, Laura',
      listingBroker: 'Jeff',
      sellingAgent: 'Alay, Chrish',
      sellingBroker: 'Symond, Johnsan',
      description: 'Very niceplace for Live',
      bedCount: 3,
      bathCount: 2,
      neighborhood: 'Macdonald',
      county: 'Canda',
      squareFeet: 500,
      lotSize: 5,
      yearBuilt: 2015,
      hoaFees: true,
      soldDate: '15-11-2018',
      history: 'sold to laura on 15-11-2018',
      elementarySchool: 'elementarySchool',
      middleSchool: 'Canadian Middle School',
      highSchool: 'Western Canada High School',
      photos: 'https://i.cbc.ca/1.3372610.1450476387!/fileImage/httpImage/image.PNG_gen/derivatives/16x9_780/kelvin-treaty-5-role-play.PNG,https://www.myballard.com/images/boundary_meeting.jpg',


    }
    this.props.addHome(this.objAddHome);
    this.objAddHome = {};
  }

  //Update User Function
  updateHome = () => {

    this.objUpdateHome = {
      id: '41f0e3f5-e8e1-47c4-863e-c7ebc39b86cf',
      price: '650',

    }
    this.props.updateHome(this.objUpdateHome);
    this.objUpdateHome = {};
  }

  //Delete User Function
  deleteHome = () => {

    this.objDeleteHome = {
      id: '41f0e3f5-e8e1-47c4-863e-c7ebc39b86cf'
    }
    this.props.deleteHome(this.objDeleteHome);
    this.objDeleteHome = {};
  }


  render() {
    console.log('props: ', this.props)

    return (<div>

      <button onClick={this.addHome}>Add Home</button>
      &nbsp;
      <button onClick={this.updateHome}>Update Home</button>
      &nbsp;
      <button onClick={this.deleteHome}>Delete Home</button>

      <h2>Listing Home</h2>
      {

        this.props.MyHomeTypeTable.map((listhome, index) => (

          <p> Name: {listhome.address}<br/>
            City: {listhome.price}<br/>
            <hr/>
          </p>
        ))


      }

    </div>)
  }

}

const AppWithUserGraphQueries = compose(
  //Add User
  graphql(GQLAddhome, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      addHome: objAddHome => {
        props.mutate({
          variables: objAddHome,
          optimisticResponse: {
            __typename: 'UserType',
            createMyHomeType: {
              ...objAddHome,
              __typename: 'UserType'
            }
          },
        })
      },

    })
  }),

  //Update User
  graphql(GQLUpdatehome, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      updateHome: objUpdateHome => {
        props.mutate({
          variables: objUpdateHome,
          optimisticResponse: {
            __typename: 'UserType',
            updateMyHomeType: {
              ...objUpdateHome,
              __typename: 'UserType'
            }
          },
        })
      },

    })
  }),

  //Delete User
  graphql(GQLDeleteHome, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      deleteHome: objDeleteHome => {
        props.mutate({
          variables: objDeleteHome,
          optimisticResponse: {
            __typename: 'UserType',
            deleteMyHomeType: {
              ...objDeleteHome,
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
      MyHomeTypeTable: props.data.listMyHomeTypes ? props.data.listMyHomeTypes.items : []
    })
  }),
)(Homedata)


export default withData(AppWithUserGraphQueries)
