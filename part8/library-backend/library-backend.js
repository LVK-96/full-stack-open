const uuid = require('uuid/v1');
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book  = require('./models/book')

require('dotenv').config()

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  });

/*
 *let authors = [
 *  {
 *    name: 'Robert Martin',
 *    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
 *    born: 1952,
 *  },
 *  {
 *    name: 'Martin Fowler',
 *    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
 *    born: 1963,
 *  },
 *  {
 *    name: 'Fyodor Dostoevsky',
 *    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
 *    born: 1821,
 *  },
 *  {
 *    name: 'Joshua Kerievsky', // birthyear not known
 *    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
 *  },
 *  {
 *    name: 'Sandi Metz', // birthyear not known
 *    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
 *  },
 *];
 */

/*
 * It would be more sensible to assosiate book and the author by saving
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
 */

/*
 *let books = [
 *  {
 *    title: 'Clean Code',
 *    published: 2008,
 *    author: 'Robert Martin',
 *    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
 *    genres: ['refactoring'],
 *  },
 *  {
 *    title: 'Agile software development',
 *    published: 2002,
 *    author: 'Robert Martin',
 *    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
 *    genres: ['agile', 'patterns', 'design'],
 *  },
 *  {
 *    title: 'Refactoring, edition 2',
 *    published: 2018,
 *    author: 'Martin Fowler',
 *    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
 *    genres: ['refactoring'],
 *  },
 *  {
 *    title: 'Refactoring to patterns',
 *    published: 2008,
 *    author: 'Joshua Kerievsky',
 *    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
 *    genres: ['refactoring', 'patterns'],
 *  },
 *  {
 *    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
 *    published: 2012,
 *    author: 'Sandi Metz',
 *    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
 *    genres: ['refactoring', 'design'],
 *  },
 *  {
 *    title: 'Crime and punishment',
 *    published: 1866,
 *    author: 'Fyodor Dostoevsky',
 *    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
 *    genres: ['classic', 'crime'],
 *  },
 *  {
 *    title: 'The Demon',
 *    published: 1872,
 *    author: 'Fyodor Dostoevsky',
 *    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
 *    genres: ['classic', 'revolution'],
 *  },
 *];
 */

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world',
    bookCount: async () => {
      const books = await Book.find({});
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author', { name: 1 });
      const booksByAuthor = args.author
        ? books.filter((book) => args.author === book.author.name) : books;
      const booksByAuthorByGenre = args.genre
        ? booksByAuthor.filter((book) => book.genres.includes(args.genre))
        : booksByAuthor;
      return booksByAuthorByGenre;
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root });
      return books.length;
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({
          name: args.author,
          born: null,
        });
        await author.save();
      }

      const book = new Book({ ...args, author: author });
      await book.save();
      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      const toBeUpdated = { born: args.setBornTo };
      const updatedAuthor = await Author.findByIdAndUpdate(author.id, toBeUpdated, { new: true });
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
