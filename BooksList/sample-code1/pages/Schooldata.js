import React, {Component} from 'react';
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import withData from '../withData';
import PropTypes from 'prop-types';

let Schooldata = {
  public: 0,
  private: 1
};

const SchooldataJSON = JSON.stringify(Schooldata);

let SchoolLevel = {
  elementary: 'Canda',
  middle: 'No',
  highschool: 2

};

const SchoolLevelJSON = JSON.stringify(SchoolLevel);

//Add School Query
const GQLAddSchool = gql`
    mutation addSchool($name: String, $type: String, $level: String, $rating: Int){
        createMySchoolType(input: {
            name: $name
            type: $type
            level: $level
            rating: $rating
            
    }) {
            id
            name
            type
            level
            rating
    }
    }
`;

//Update School Query
const GQLUpdateSchool = gql`
    mutation updateSchool($id: String!, $name: String){
      updateMySchoolType(input: {
      id: $id  
      name: $name
    }) {
      id
      name
    }
    }
`;

//Delete School Query
const GQLDeleteSchool = gql`
mutation deleteSchool($id: String!) {
  deleteMySchoolType(input: {
        id: $id        
      }) {
        id
      }
      }
  `;

//List School Query
const query = gql`
query listMySchoolTypes{
  listMySchoolTypes(limit: 10){
    items{
        id
        name
        type
        level
        rating
    }
  }
}
`;

/*List Schools by String*/
// const getSchoolbyid = gql`
// query getSchoolType{
//       getSchoolType(id:"03b9eeb1-2f45-4932-ad3b-faf7a69a3155"){
//         id
//         name
//         type
//         level
//         rating
//       }
//
// }`


class School extends Component {
  constructor(props) {
    super(props);
    this.name = '';
    this.type = '';
    this.level = '';
    this.rating = '';

    this.objAddSchool = {};
    this.objUpdateSchool = {};
    this.objDeleteSchool = {};
  }

  //Add School Function
  addSchool = () => {

    this.objAddSchool = {
      /*name= this.name, 
        type= this.type,
        level= this.level,
        rating= this.rating
      */
      name: 'Loius',
      type: SchooldataJSON,
      level: SchoolLevelJSON,
      rating: 10,

    }
    this.props.addSchool(this.objAddSchool);
    this.objAddSchool = {};
  }

  //Update School Function
  updateSchool = () => {

    this.objUpdateSchool = {
      id: '03b9eeb1-2f45-4932-ad3b-faf7a69a3155',
      name: 'Laura',

    }
    this.props.updateSchool(this.objUpdateSchool);
    this.objUpdateSchool = {};
  }

  //Delete School Function
  deleteSchool = () => {

    this.objDeleteSchool = {
      id: '03b9eeb1-2f45-4932-ad3b-faf7a69a3155'
    }
    this.props.deleteSchool(this.objDeleteSchool);
    this.objDeleteSchool = {};
  }


  render() {
    return (
      <div>
        <button onClick={this.addSchool}>Add School</button>
        <button onClick={this.updateSchool}>Update School</button>
        <button onClick={this.deleteSchool}>Delete School</button>
        <h2>Listing School</h2>
        {
          this.props.MySchoolTypeTable.map((School, index) => (
            <p key={index}> Name: {School.name}<br/>
              Rating: {School.rating}<br/>
              <hr/>
            </p>
          ))
        }
      </div>
    )
  }

}

School.propTypes = {
  MySchoolTypeTable: PropTypes.array,
  addSchool: PropTypes.any,
  updateSchool: PropTypes.any,
  deleteSchool: PropTypes.any
}

const AppWithSchoolGraphQueries = compose(
  //Add School
  graphql(GQLAddSchool, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      addSchool: objAddSchool => {
        props.mutate({
          variables: objAddSchool,
          optimisticResponse: {
            __typename: 'School',
            createMySchoolType: {
              ...objAddSchool,
              __typename: 'School'
            }
          },
        })
      },

    })
  }),

  //Update School
  graphql(GQLUpdateSchool, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      updateSchool: objUpdateSchool => {
        props.mutate({
          variables: objUpdateSchool,
          optimisticResponse: {
            __typename: 'School',
            updateMySchoolType: {
              ...objUpdateSchool,
              __typename: 'School'
            }
          },
        })
      },

    })
  }),

  //Delete School
  graphql(GQLDeleteSchool, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      deleteSchool: objDeleteSchool => {
        props.mutate({
          variables: objDeleteSchool,
          optimisticResponse: {
            __typename: 'School',
            deleteMySchoolType: {
              ...objDeleteSchool,
              __typename: 'School'
            }
          },
        })
      },

    })
  }),

  //Listing School
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      MySchoolTypeTable: props.data.listMySchoolTypes ? props.data.listMySchoolTypes.items : []
    })
  }),
)(School)


export default withData(AppWithSchoolGraphQueries)
