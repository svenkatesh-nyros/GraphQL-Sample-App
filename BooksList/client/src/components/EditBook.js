import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery, getBookQuery, editBookMutation } from '../queries/queries';

import FormError from './FormError.js';

class EditBook extends Component{
	constructor(props){
		super(props);
		this.state={
			book_id: '',
			book_name:'',
			genre:'',
			authorId:'',

			book_name_err_status: false,
			book_name_err_msg:'',
			genre_err_status: false,
			genre_err_msg: '',
			authorId_err_status: false,
			authorId_err_msg: ''
		}
		this.changeGenre = this.changeGenre.bind(this);
		this.changeBookName = this.changeBookName.bind(this);
		this.displayAuthors = this.displayAuthors.bind(this);
		this.changeAuthor = this.changeAuthor.bind(this);
		this.submitEditBook = this.submitEditBook.bind(this);
	}
	componentWillReceiveProps(nextProps){
		console.log('nextProps',nextProps)
		if(nextProps.bookId)
		{
			console.log('bookID is --->',nextProps.bookId);
			console.log('book name is --->',nextProps.data.book);
			if(nextProps.bookId !==null && nextProps.data.book !== null)
			{
				this.setState({
					book_id: nextProps.bookId,
					book_name:nextProps.data.book.name,
					genre:nextProps.data.book.genre,
					authorId: nextProps.data.book.author.id,
				});
			}
			
		}
		else
		{
			console.log('else');
		}
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
				return(<option key={author.id} value={author.id} >{author.name}</option>)
			});
		}
	}

	changeAuthor = (e) => {
		var selected = e.target.value;
		this.setState({
			authorId: selected,
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

	submitEditBook = (e) => {
		e.preventDefault();
		var book_id = this.state.book_id;
		var book_name = this.state.book_name;
		var genre = this.state.genre;
		var authorId = this.state.authorId;

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
			this.props.editBookMutation({
				variables: {
					id: this.state.book_id,
					name: this.state.book_name,
					genre: this.state.genre,
					authorId: this.state.authorId,
				},
				refetchQueries: [{query: getBooksQuery},{query: getBookQuery,variables: {id: this.props.bookId}}]
			});
		}
	}
	
	render(){
		return(
			<div>
				<form id="add-book" onSubmit={(e) => this.submitEditBook(e)}>
					<h3>Edit Book <span className="close_btn" onClick={() => this.props.clearBook()}>X</span></h3>
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
						<select onChange={(e) => this.changeAuthor(e)} value={this.state.authorId}
                             >
							<option>Select Author</option>
							{this.displayAuthors()}
						</select>
					</div>
					<button className="sub_btn">+</button>
				</form>
			</div>
			);
	}
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"}),
    graphql(editBookMutation,{name:"editBookMutation"}),
    graphql(getBookQuery,{options: (props)=> {return {variables: {id: props.bookId}}}})
)(EditBook);

