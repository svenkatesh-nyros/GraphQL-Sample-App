import React, {Component} from 'react';
import gql from 'graphql-tag'
import {compose, graphql} from 'react-apollo'
import {from} from 'zen-observable';
import withData from '../withData';

let Questions = {
  first: 'Which one is best place?',
  second: 'Is this Ok for live?'
};

const QuestionsJSON = JSON.stringify(Questions);

let Response = {
  first: 'Canda',
  second: 'No'

};

const ResponseJSON = JSON.stringify(Response);
//Add QuestionandAnswer Query
const GQLAddQuestionandAnswer = gql`
    mutation addQuestionandAnswer($question: String, $responses: String, $neighborhoodId: Int){
        createMyQuestionandAnswerType(input: {
            question: $question
            responses: $responses
            neighborhoodId: $neighborhoodId
            
    }) {
            id
            question
            responses
            neighborhoodId
    }
    }
`;

//Update QuestionandAnswer Query
const GQLUpdateQuestionandAnswer = gql`
    mutation updateQuestionandAnswer($id: String!, $neighborhoodId: Int){
      updateMyQuestionandAnswerType(input: {
      id: $id  
      neighborhoodId: $neighborhoodId
    }) {
      id
      question
    }
    }
`;

//Delete QuestionandAnswer Query
const GQLDeleteQuestionandAnswer = gql`
mutation deleteQuestionandAnswer($id: String!) {
  deleteMyQuestionandAnswerType(input: {
        id: $id        
      }) {
        id
      }
      }
  `;

//List QuestionandAnswer Query
const query = gql`
query listMyQuestionandAnswerTypes{
  listMyQuestionandAnswerTypes(limit: 10){
    items{
        id
        question
        responses
        neighborhoodId
    }
  }
}
`;

//List QuestionandAnswers by ID
const getQuestionandAnswerbyid = gql`
query getQuestionandAnswerType{
      getQuestionandAnswerType(id:"96f057bc-9556-438b-a40d-5bffd61415c6"){
        id
        question
        responses
        neighborhoodId
      }
    
}
`


class QuestionandAnswerdata extends Component {
  constructor(props) {
    super(props);
    this.question = '';
    this.responses = '';
    this.neighborhoodId = '';

    this.objAddQuestionandAnswer = {};
    this.objUpdateQuestionandAnswer = {};
    this.objDeleteQuestionandAnswer = {};
  }

  //Add QuestionandAnswer Function
  addQuestionandAnswer = () => {

    this.objAddQuestionandAnswer = {
      /*question= this.question, 
        responses= this.responses,
        neighborhoodId= this.neighborhoodId,
      */
      question: QuestionsJSON,
      responses: ResponseJSON,
      neighborhoodId: 9478546

    }
    this.props.addQuestionandAnswer(this.objAddQuestionandAnswer);
    this.objAddQuestionandAnswer = {};
  }

  //Update QuestionandAnswer Function
  updateQuestionandAnswer = () => {

    this.objUpdateQuestionandAnswer = {
      id: '96f057bc-9556-438b-a40d-5bffd61415c6',
      neighborhoodId: 949494,

    }
    this.props.updateQuestionandAnswer(this.objUpdateQuestionandAnswer);
    this.objUpdateQuestionandAnswer = {};
  }

  //Delete QuestionandAnswer Function
  deleteQuestionandAnswer = () => {

    this.objDeleteQuestionandAnswer = {
      id: '96f057bc-9556-438b-a40d-5bffd61415c6'
    }
    this.props.deleteQuestionandAnswer(this.objDeleteQuestionandAnswer);
    this.objDeleteQuestionandAnswer = {};
  }


  render() {
    console.log('props: ', this.props)

    return (<div>

      <button onClick={this.addQuestionandAnswer}>Add QuestionandAnswer</button>
      <button onClick={this.updateQuestionandAnswer}>Update QuestionandAnswer</button>
      <button onClick={this.deleteQuestionandAnswer}>Delete QuestionandAnswer</button>

      <h2>Listing QuestionandAnswer</h2>
      {

        this.props.MyQuestionandAnswerTypeTable.map((QuestionandAnswer, index) => (

          <p> Question: {JSON.parse(QuestionandAnswer.question).first}<br/>
            Response: {JSON.parse(QuestionandAnswer.responses).first}<br/>
            <hr/>
          </p>
        ))


      }

    </div>)
  }

}

const AppWithQuestionandAnswerGraphQueries = compose(
  //Add QuestionandAnswer
  graphql(GQLAddQuestionandAnswer, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      addQuestionandAnswer: objAddQuestionandAnswer => {
        props.mutate({
          variables: objAddQuestionandAnswer,
          optimisticResponse: {
            __typename: 'QuestionandAnswer',
            createMyQuestionandAnswerType: {
              ...objAddQuestionandAnswer,
              __typename: 'QuestionandAnswer'
            }
          },
        })
      },

    })
  }),

  //Update QuestionandAnswer
  graphql(GQLUpdateQuestionandAnswer, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      updateQuestionandAnswer: objUpdateQuestionandAnswer => {
        props.mutate({
          variables: objUpdateQuestionandAnswer,
          optimisticResponse: {
            __typename: 'QuestionandAnswer',
            updateMyQuestionandAnswerType: {
              ...objUpdateQuestionandAnswer,
              __typename: 'QuestionandAnswer'
            }
          },
        })
      },

    })
  }),

  //Delete QuestionandAnswer
  graphql(GQLDeleteQuestionandAnswer, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      deleteQuestionandAnswer: objDeleteQuestionandAnswer => {
        props.mutate({
          variables: objDeleteQuestionandAnswer,
          optimisticResponse: {
            __typename: 'QuestionandAnswer',
            deleteMyQuestionandAnswerType: {
              ...objDeleteQuestionandAnswer,
              __typename: 'QuestionandAnswer'
            }
          },
        })
      },

    })
  }),

  //Listing QuestionandAnswer
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      MyQuestionandAnswerTypeTable: props.data.listMyQuestionandAnswerTypes ? props.data.listMyQuestionandAnswerTypes.items : []
    })
  }),
)(QuestionandAnswerdata)


export default withData(AppWithQuestionandAnswerGraphQueries)
