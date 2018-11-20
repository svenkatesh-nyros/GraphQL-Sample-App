const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');
const _ = require('lodash');

const { 
	GraphQLObjectType,
	GraphQLInt, 
	GraphQLString, 
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType ({
	name: 'Book',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		genre: {type: GraphQLString},
		authorId: {type: GraphQLID},
		author:{
			type: AuthorType,
			resolve(parent,args){
				//return _.find(authors, {id: parent.authorId})
				return Author.findById(parent.authorId);		
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		age: {type: GraphQLInt},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent,args){
				//return _.filter(books,{ authorId: parent.id})
				return Book.find({authorId: parent.id})
			}
		}
	})
});


const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book:{
			type: BookType,
			args: {id: {type: GraphQLID}},
			resolve(parent,args){
				//return _.find(books, {id: args.id})
				return Book.findById(args.id)
			}
		},
		author: {
			type: AuthorType,
			args: {id: {type: GraphQLID}},
			resolve(parent,args){
				//code to get data from the db or json data
				// return _.find(authors, {id: args.id});
				return Author.findById(args.id);
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent,args){
				// return books //local books array
				return Book.find({}); //getting data from MongoDB
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent,args){
				// return authors
				return Author.find({});
			}
		},
	}
})

//Mutations are used for performing create or alter operations(actions)

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor:{
			type: AuthorType,
			args: {
				name: {type: GraphQLString},
				age: {type: GraphQLInt}
			},
			resolve(parent,args){
				let author = new Author({
					name: args.name,
					age: args.age
				});
				return author.save();
			}
		},
		addBook:{
			type: BookType,
			args:{
				name: {type: new GraphQLNonNull(GraphQLString)},
				genre: {type: new GraphQLNonNull(GraphQLString)},
				authorId:{type:new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent,args){
				let book= new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				})
				return book.save();
			}
		},
		deleteBook:{
			type: BookType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve(parent,args){
				return Book.deleteOne({_id: args.id});
			}
		},
		editBook: {
			type: BookType,
			args: {
					id: {type: new GraphQLNonNull(GraphQLString)},
					name: {type: new GraphQLNonNull(GraphQLString)},
					genre: {type: new GraphQLNonNull(GraphQLString)},
					authorId: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent,args){
				return Book.findByIdAndUpdate(
				      args.id,
				      { $set: { name: args.name,genre: args.genre, authorId: args.authorId}},
				      { new: true }
				)
				.catch(err => new Error(err));
			}
		}
	}
})


module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});