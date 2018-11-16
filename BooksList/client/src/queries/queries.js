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

const addAuthorMutation = gql`
	mutation AddAuthor($name:String!,$age:Int){
		addAuthor(name:$name,age: $age){
			name
			age
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

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, addAuthorMutation };