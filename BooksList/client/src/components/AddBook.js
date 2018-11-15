import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

import FormError from './FormError.js';

class AddBook extends Component{
	constructor(props){
		super(props);
		this.state={
			book_name:'',
			genre:'',
			author:'',

			book_name_err_status: false,
			book_name_err_msg:'',
			genre_err_status: false,
			genre_err_msg: '',
			author_err_status: false,
			author_err_msg: ''
		}
		this.changeGenre = this.changeGenre.bind(this);
		this.changeBookName = this.changeBookName.bind(this);
		this.displayAuthors = this.displayAuthors.bind(this);
		this.changeAuthor = this.changeAuthor.bind(this);
		this.submiAddBook = this.submitAddBook.bind(this);
	}
	
	displayAuthors = () => {
		var data = this.props.getAuthorsQuery;
		if(data.loading)
		{
			return <option disabled>Loading Authors...</option>
		}
		else
		{
			return data.authors.map(author => {
				return(<option key={author.id} value={author.id}>{author.name}</option>)
			});
		}
	}

	changeAuthor = (e) => {
		var selected = e.target.value;
		this.setState({
			author: selected,
		});
	}

	changeBookName= (e) => {
		var book_name = e.target.value;
		this.setState({
			book_name: book_name,
			book_name_err_status:false,
		});
	}

	changeGenre = (e) => {
		var genre = e.target.value;
		this.setState({
			genre: genre,
			genre_err_status:false,
		});
	}

	submitAddBook = (e) => {
		e.preventDefault();
		var book_name = this.state.book_name;
		var genre = this.state.genre;
		var author_id = this.state.author_id;

		var flag = 1;
		if(book_name === '')
		{
			flag = 0;
			this.setState({
				book_name_err_status: true,
				book_name_err_msg: '* please enter book name',
			});
		}
		if(book_name.length < 3)
		{
			flag = 0;
			this.setState({
				book_name_err_status: true,
				book_name_err_msg:'* book name is minimum 3 characters!',
			});
		}
		if(genre==='')
		{
			flag = 0;
			this.setState({
				genre_err_status:true,
				genre_err_msg:'* please enter Genre of Book!',
			});
		}

		if(flag === 1)
		{
			this.props.addBookMutation({
				variables: {
					name: this.state.book_name,
					genre: this.state.genre,
					authorId: this.state.author,
				},
				refetchQueries: [{query: getBooksQuery}]
			});
		}
	}
	
	render(){
		return(
			<form id="add-book" onSubmit={(e) => this.submitAddBook(e)}>
					<h3>Add Book</h3>
					<div className="input_field">
						<label>Book Name:</label>
						<input type="text" value={this.state.book_name} onChange={(e)=> this.changeBookName(e)} />
					</div>
					<FormError err_status={this.state.book_name_err_status} err_msg={this.state.book_name_err_msg} />
					<div className="input_field">
						<label>Genre:</label>
						<input type="text" value={this.state.genre} onChange={(e) => this.changeGenre(e)} />
					</div>
					<FormError err_status={this.state.genre_err_status} err_msg={this.state.genre_err_msg} />
					<div className="input_field">
						<label>Author:</label>
						<select onChange={(e) => this.changeAuthor(e)} >
							<option>Select Author</option>
							{this.displayAuthors()}
						</select>
					</div>
					<button className="sub_btn">+</button>
				</form>
			);
	}
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook);
