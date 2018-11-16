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


var books = [
	{id: "1",name:"History of India",genre:"History",authorId:"1"},
	{id: "2",name:"Sample Book1",genre:"sci-fi",authorId:"2"},
	{id: "3",name:"Sample Book2",genre:"history",authorId:"3"},
	{id: "4",name:"Name of the Wind", genre:"Fantasy",authorId:"1"},
	{id: "5",name:"The Last Empire",genre:"Fantasy",authorId:"1"},
	{id: "6",name:"Battle of War",genre:"Fantasy",authroId:"2"},
	{id: "7",name:"Avengers Age of Ultron",genre: "Fantasy",authorId:"3"},
	{id: "8",name:"BattleShip",genre:"Fantasy",authorId:"6"}
];

// Bhaskar: 5bed0cdc0cb7ad3db218750c
// Venkatesh: 5bed0a18a1f4443a5c533812
// Madhu: 5bed0cff0cb7ad3db218750d
// Manohar: 5bed0d080cb7ad3db218750e
// Chandu: 5bed0d2b0cb7ad3db218750f
// Sankar: 5bed0d520cb7ad3db2187510

var authors = [
	{id: "1",name:"Venkatesh",age:25},
	{id: "2",name:"Bhaskar",age:23},
	{id: "3",name:"Manohar",age:24}
];

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
		}
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
				id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent,args){
				return Book.deleteOne({_id: args.id});
			}
		}
	}
})


module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});