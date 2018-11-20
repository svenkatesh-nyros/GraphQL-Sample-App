import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addAuthorMutation } from '../queries/queries';

import FormError from './FormError.js';

class AddAuthor extends Component{
	constructor(props){
		super(props);
		this.state={
			author_name:'',
			age:'',
			author_name_err_status: false,
			author_name_err_msg:'',
			age_err_status: false,
			age_err_msg: '',
		}
		this.changeAge = this.changeAge.bind(this);
		this.changeAuthorName = this.changeAuthorName.bind(this);
		this.submitAddBook = this.submitAddAuthor.bind(this);
	}
	
	changeAuthorName= (e) => {
		var author_name = e.target.value;
		this.setState({
			author_name: author_name,
			author_name_err_status:false,
		});
	}

	changeAge = (e) => {
		var age = e.target.value;
		this.setState({
			age: age,
			age_err_status:false,
		});
	}

	submitAddAuthor = (e) => {
		e.preventDefault();
		var author_name = this.state.author_name;
		var age = this.state.age;
		

		var flag = 1;
		if(author_name === '')
		{
			flag = 0;
			this.setState({
				author_name_err_status: true,
				author_name_err_msg: '* please enter author name',
			});
		}
		if(author_name.length < 3)
		{
			flag = 0;
			this.setState({
				author_name_err_status: true,
				author_name_err_msg:'* author name is minimum 3 characters!',
			});
		}
		if(age==='')
		{
			flag = 0;
			this.setState({
				age_err_status:true,
				age_err_msg:'* please enter age of Author!',
			});
		}

		if(flag === 1)
		{
			this.props.addAuthorMutation({
				variables:{
					name: this.state.author_name,
					age: parseInt(this.state.age,10)
				}
				// , refetchQueries: [{query: getBooksQuery}] //for getting other queries 
			});
		
		}
	}
	
	render(){
		return(
			<form id="add-author" onSubmit={(e) => this.submitAddAuthor(e)}>
					<h3>Add Author</h3>
					<div className="input_field">
						<label>Author Name:</label>
						<input type="text" value={this.state.author_name} onChange={(e)=> this.changeAuthorName(e)} />
					</div>
					<FormError err_status={this.state.author_name_err_status} err_msg={this.state.author_name_err_msg} />
					<div className="input_field">
						<label>Age:</label>
						<input type="text" value={this.state.age} onChange={(e) => this.changeAge(e)} />
					</div>
					<FormError err_status={this.state.age_err_status} err_msg={this.state.age_err_msg} />
					<button className="sub_btn">+</button>
				</form>
			);
	}
}

export default compose(
    graphql(addAuthorMutation,{name:"addAuthorMutation"})
)(AddAuthor);
