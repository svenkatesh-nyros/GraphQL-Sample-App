import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import BookDetails from './BookDetails.js';

import { getBooksQuery } from '../queries/queries.js';

class BookList extends Component{
	constructor(props){
		super(props);
		this.state={
			selected: null,
			active:null,
		}
		this.selectBook = this.selectBook.bind(this);
	}
	selectBook = (bookId) => {
		this.setState({
			selected: bookId,
			active: bookId,
		})
	}
	displayBooks()
	{
		var data = this.props.data;
		if(data.loading)
		{
			return (<div>Loading books...</div>)
		}
		else
		{
			return data.books.map(book => {
				return(
					<li key={book.id} className={this.state.active===book.id ? 'active': 'not-active'} onClick={() => this.selectBook(book.id)}>{book.name}</li>
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
			</div>
		);
	}
}

export default graphql(getBooksQuery)(BookList);	