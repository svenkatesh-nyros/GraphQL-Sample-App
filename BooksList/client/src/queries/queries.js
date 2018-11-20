import { gql} from 'apollo-boost';

const getBooksQuery = gql`
{
	books{
		id
		name
		genre
	}
}
`;

// const deleteBookQuery = gql`
// 	query deleteBook($id: ID){
// 		deleteBook(id: $id){
// 			id
// 		}
// 	}
// `;

const getAuthorsQuery = gql`
{
	authors{
		id
		name
		age
	}
}
`;

const addBookMutation = gql`
	mutation AddBook($name: String!, $genre: String!, $authorId:ID!) {
		addBook(name:$name,genre:$genre,authorId:$authorId){
			name
			id
		}
	}
`;

const editBookMutation = gql`
	mutation editBook($id: String!, $name: String!,$genre: String!, $authorId: ID!) {
		editBook(id: $id, name: $name, genre: $genre, authorId: $authorId ){
			id
			name
			authorId
		}
	}
`;

const addAuthorMutation = gql`
	mutation AddAuthor($name:String!,$age:Int){
		addAuthor(name:$name,age: $age){
			name
			age
		}
	}
`;

const deleteBookMutation = gql`
	mutation deleteBook($id: String!){
		deleteBook(id: $id){
			id
		}
	}
`;

const getBookQuery = gql`
	query GetBook($id: ID){
		book(id: $id){
			id
			name
			genre
			author{
				id
				name
				age
				books{
					name
					id
				}
			}
		}
	}
`;




export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, addAuthorMutation, deleteBookMutation, editBookMutation };