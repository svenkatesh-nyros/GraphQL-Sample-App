import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import BookDetails from './BookDetails.js';
import AddBook from './AddBook.js';
import AddAuthor from './AddAuthor.js';
import EditBook from './EditBook.js';

import { getBooksQuery, deleteBookMutation, getBookQuery } from '../queries/queries.js';

class BookList extends Component{
	constructor(props){
		super(props);
		this.state={
			selected: null,
			active:null,
		}
		this.selectBook = this.selectBook.bind(this);
		this.deleteBook = this.deleteBook.bind(this);
		this.clearBook = this.clearBook.bind(this);
	}
	selectBook = (bookId) => {
		this.setState({
			selected: bookId,
			active: bookId,
		},function(){
			console.log('this.state.selected',this.state.selected);
		})
	}

	deleteBook = (book_id) => {
		this.props.deleteBookMutation({
				variables:{
					id: book_id
				}, refetchQueries: [{query: getBooksQuery}] //for getting other queries 
			});
	}

	clearBook = () => {
		this.setState({
			selected: null,
			active: null,
		})
	}
	
	displayBooks()
	{
		var data = this.props.getBooksQuery;
		if(data.loading)
		{
			return (<div>Loading books...</div>)
		}
		else
		{
			return data.books.map(book => {
				return(
					
					<li key={book.id} className={this.state.active===book.id ? 'active': 'not-active'}><span onClick={() => this.selectBook(book.id)} className="book_item">{book.name}</span><span className="close_btn" onClick={() => this.deleteBook(book.id)}>X</span></li>
				);
			})
		}
	}
	render(){
		return(
			<div>
				<ul id="book-list">
					{this.displayBooks()}
				</ul>
				<BookDetails bookId={this.state.selected} />
				<AddBook />
				{this.state.selected ? <EditBook bookId={this.state.selected} clearBook={() => this.clearBook()}/> : ''}
          		<AddAuthor />
			</div>
		);
	}
}

// export default compose(
//     graphql(addAuthorMutation,{name:"addAuthorMutation"})
// )(AddAuthor);


// export default graphql(getBookQuery,{
// 	options:(props)=>{
// 		return {
// 			variables: {
// 				id: props.bookId
// 			}
// 		}
// 	}
// })(BookDetails);

export default compose(graphql(getBooksQuery, {name:"getBooksQuery"}),
	graphql(deleteBookMutation, {name: "deleteBookMutation"}))(BookList);	