const {
  ApolloServer, UserInputError, AuthenticationError, gql,
} = require('apollo-server');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

require('dotenv').config();

const { JWT_SECRET } = process.env;
const password = process.env.PASSWORD;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

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

  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    me: User
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
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world',
    bookCount: async () => {
      try {
        const books = await Book.find({});
        return books.length;
      } catch (e) {
        throw new Error(e.message);
      }
    },
    authorCount: async () => {
      try {
        const authors = await Author.find({});
        return authors.length;
      } catch (e) {
        throw new Error(e.message);
      }
    },
    allBooks: async (root, args) => {
      try {
        const books = await Book.find({}).populate('author', { name: 1 });
        const booksByAuthor = args.author
          ? books.filter((book) => args.author === book.author.name) : books;
        const booksByAuthorByGenre = args.genre
          ? booksByAuthor.filter((book) => book.genres.includes(args.genre))
          : booksByAuthor;
        return booksByAuthorByGenre;
      } catch (e) {
        throw new UserInputError(e.message);
      }
    },
    allAuthors: async () => {
      try {
        const authors = await Author.find({});
        return authors;
      } catch (e) {
        throw new Error(e.message);
      }
    },
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => {
      try {
        const books = await Book.find({ author: root });
        return books.length;
      } catch (e) {
        throw new Error(e.message);
      }
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('You need to login to add books');
      }
      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({
            name: args.author,
            born: null,
          });

          await author.save();
        }

        const book = new Book({ ...args, author });
        await book.save();
        return book;
      } catch (e) {
        throw new UserInputError(e.message);
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('You need to login to edit authors');
      }
      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) return null;
        const toBeUpdated = { born: args.setBornTo };
        const updatedAuthor = await Author
          .findByIdAndUpdate(author.id, toBeUpdated, { new: true });
        return updatedAuthor;
      } catch (e) {
        throw new UserInputError(e.message);
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({ username: args.username });
        const savedUser = await user.save();
        return savedUser;
      } catch (e) {
        throw new UserInputError(e.mesage);
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username });
        if (!user || args.password !== password) {
          throw new UserInputError('Invalid credentials');
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        };
        return { value: jwt.sign(userForToken, JWT_SECRET) };
      } catch (e) {
        throw new Error(e.message);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      try {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET,
        );
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      } catch (e) {
        throw new AuthenticationError(e.message);
      }
    }

    return null;
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
