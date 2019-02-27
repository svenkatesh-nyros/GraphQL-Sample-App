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
  listMyHomeTypes(limit: 50){
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
    this.state = {
      address: '',
      price: '',
      propertyType: '',
      status: '',
      mlsNumber: '',
      openHouse: '',
      listingAgent: '',
      listingBroker: '',
      sellingAgent: '',
      sellingBroker: '',
      description: '',
      bedCount: '',
      bathCount: '',
      neighborhood: '',
      county: '',
      squareFeet: '',
      lotSize: '',
      yearBuilt: '',
      hoaFees: '',
      soldDate: '',
      history: '',
      elementarySchool: '',
      middleSchool: '',
      highSchool: '',
      photos: '',
    }

    this.objAddHome = {};
    this.objUpdateHome = {};
    this.objDeleteHome = {};
    //this.handleChange = this.handleChange.bind(this);
    this.addHome = this.addHome.bind(this);
  }


  //Add User Function
  addHome = (event) => {
    //alert(this.state.address);
    //this.setState({address: event.target.address.value});

    /*   this.address=event.target.address.value;
     this.price=event.target.price.value;
      this.propertyType=event.target.propertyType.value;
      this.status=event.target.status.value;
      this.mlsNumber=event.target.mlsNumber.value;
      this.openHouse=event.target.openHouse.value;
      this.listingAgent=event.target.listingAgent.value;
      this.listingBroker=event.target.listingBroker.value;
      this.sellingAgent=event.target.sellingAgent.value;
      this.sellingBroker=event.target.sellingBroker.value;
      this.description=event.target.description.value;
      this.bedCount=event.target.bedCount.value;
      this.bathCount=event.target.bathCount.value;
      this.neighborhood=event.target.neighborhood.value;
      this.county=event.target.county.value;
      this.squareFeet=event.target.squareFeet.value;
      this.lotSize=event.target.lotSize.value;
      this.yearBuilt=event.target.yearBuilt.value;
      this.hoaFees= event.target.hoaFees.value;
      this.soldDate=event.target.soldDate.value;
      this.history=event.target.history.value;
      this.elementarySchool=event.target.elementarySchool.value;
      this.middleSchool=event.target.middleSchool.value;
      this.highSchool=event.target.highSchool.value;
      this.photos=event.target.photos.value;*/


    this.objAddHome = {
      address: this.state.address,
      price: this.state.price,
      propertyType: this.state.propertyType,
      status: this.state.status,
      mlsNumber: this.state.mlsNumber,
      openHouse: this.state.openHouse,
      listingAgent: this.state.listingAgent,
      listingBroker: this.state.listingBroker,
      sellingAgent: this.state.sellingAgent,
      sellingBroker: this.state.sellingBroker,
      description: this.state.description,
      bedCount: this.state.bedCount,
      bathCount: this.state.bathCount,
      neighborhood: this.state.neighborhood,
      county: this.state.county,
      squareFeet: this.state.squareFeet,
      lotSize: this.state.lotSize,
      yearBuilt: this.state.yearBuilt,
      hoaFees: this.state.hoaFees,
      soldDate: this.state.soldDate,
      history: this.state.history,
      elementarySchool: this.state.elementarySchool,
      middleSchool: this.state.middleSchool,
      highSchool: this.state.highSchool,
      photos: this.state.photos
      /*  address: event.target.value,
        price: 30,
        propertyType: propertyType,
        status: homestatus,
        mlsNumber: "50",
        openHouse: "20-12-1998, 05-12-2018",
        listingAgent: "Andrew, Laura",
        listingBroker: "Jeff",
        sellingAgent: "Alay, Chrish",
        sellingBroker: "Symond, Johnsan",
        description: "Very niceplace for Live",
        bedCount: 3,
        bathCount: 2,
        neighborhood: "Macdonald",
        county: "Canda",
        squareFeet: 500,
        lotSize: 5,
        yearBuilt: 2015,
        hoaFees: true,
        soldDate: "15-11-2018",
        history: "sold to laura on 15-11-2018",
        elementarySchool: "elementarySchool",
        middleSchool: "Canadian Middle School",
        highSchool: "Western Canada High School",
        photos: "https://i.cbc.ca/1.3372610.1450476387!/fileImage/httpImage/image.PNG_gen/derivatives/16x9_780/kelvin-treaty-5-role-play.PNG,https://www.myballard.com/images/boundary_meeting.jpg",
       */

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

      {/* <button onClick={this.addHome}>Add Home</button> &nbsp; */}
      <button onClick={this.updateHome}>Update Home</button>
      &nbsp;
      <button onClick={this.deleteHome}>Delete Home</button>

      <form onSubmit={this.addHome}>
        <label htmlFor="username">Address</label>
        <input id="address" name="address" value={this.state.address} type="text"
          onChange={(event) => this.setState({address: event.target.value})}/> <br/>
        <label htmlFor="username">price</label>
        <input id="price" name="price" value={this.state.price}
          onChange={(event) => this.setState({price: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">propertyType</label>
        <input id="propertyType" name="propertyType" value={this.state.propertyType}
          onChange={(event) => this.setState({propertyType: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">status</label>
        <input id="status" name="status" value={this.state.status}
          onChange={(event) => this.setState({status: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">mlsNumber</label>
        <input id="mlsNumber" name="mlsNumber" value={this.state.mlsNumber}
          onChange={(event) => this.setState({mlsNumber: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">openHouse</label>
        <input id="openHouse" name="openHouse" value={this.state.openHouse}
          onChange={(event) => this.setState({openHouse: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">listingAgent</label>
        <input id="listingAgent" name="listingAgent" value={this.state.listingAgent}
          onChange={(event) => this.setState({listingAgent: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">listingBroker</label>
        <input id="listingBroker" name="listingBroker" value={this.state.listingBroker}
          onChange={(event) => this.setState({listingBroker: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">sellingAgent</label>
        <input id="sellingAgent" name="sellingAgent" value={this.state.sellingAgent}
          onChange={(event) => this.setState({sellingAgent: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">sellingBroker</label>
        <input id="sellingBroker" name="sellingBroker" value={this.state.sellingBroker}
          onChange={(event) => this.setState({sellingBroker: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">description</label>
        <input id="description" name="description" value={this.state.description}
          onChange={(event) => this.setState({description: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">bedCount</label>
        <input id="bedCount" name="bedCount" value={this.state.bedCount}
          onChange={(event) => this.setState({bedCount: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">bathCount</label>
        <input id="bathCount" name="bathCount" value={this.state.bathCount}
          onChange={(event) => this.setState({bathCount: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">neighborhood</label>
        <input id="neighborhood" name="neighborhood" value={this.state.neighborhood}
          onChange={(event) => this.setState({neighborhood: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">county</label>
        <input id="county" name="county" value={this.state.county}
          onChange={(event) => this.setState({county: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">squareFeet</label>
        <input id="squareFeet" name="squareFeet" value={this.state.squareFeet}
          onChange={(event) => this.setState({squareFeet: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">lotSize</label>
        <input id="lotSize" name="lotSize" value={this.state.lotSize}
          onChange={(event) => this.setState({lotSize: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">yearBuilt</label>
        <input id="yearBuilt" name="yearBuilt" value={this.state.yearBuilt}
          onChange={(event) => this.setState({yearBuilt: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">hoaFees</label>
        <input id="hoaFees" name="hoaFees" value={this.state.hoaFees}
          onChange={(event) => this.setState({hoaFees: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">soldDate</label>
        <input id="soldDate" name="soldDate" value={this.state.soldDate}
          onChange={(event) => this.setState({soldDate: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">history</label>
        <input id="history" name="history" value={this.state.history}
          onChange={(event) => this.setState({history: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">elementarySchool</label>
        <input id="elementarySchool" name="elementarySchool" value={this.state.elementarySchool}
          onChange={(event) => this.setState({elementarySchool: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">middleSchool</label>
        <input id="middleSchool" name="middleSchool" value={this.state.middleSchool}
          onChange={(event) => this.setState({middleSchool: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">highSchool</label>
        <input id="highSchool" name="highSchool" value={this.state.highSchool}
          onChange={(event) => this.setState({highSchool: event.target.value})} type="text"/> <br/>
        <label htmlFor="username">photos</label>
        <input id="photos" name="photos" value={this.state.photos}
          onChange={(event) => this.setState({photos: event.target.value})} type="text"/> <br/>
        <button onChange={this.handleChange}>Send data!</button>
      </form>
      <h2>Listing Home</h2>
      {

        this.props.MyHomeTypeTable.map((listhome, index) => (

          <p> Address: {listhome.address}<br/>
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
