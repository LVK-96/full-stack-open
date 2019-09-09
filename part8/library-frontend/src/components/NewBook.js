import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { FILTER_BOOKS } from './Books'

const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!, $author: String!, $published: Int!, $genres: [String!]
  ) {
    addBook(
      title: $title, author: $author, published: $published, genres: $genres
    ) {
      title
      published
      genres
      author {
        name
      }
    }
  },
`

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [addBook, { loading, error }] = useMutation(
    ADD_BOOK,
    {
      update: (store, response) => {
        const dataInStore = store.readQuery({
          query: FILTER_BOOKS,
          variables: { genre: '' }
        })
        dataInStore.genres.push({
          genres: response.data.addBook.genres,
          __typename: 'Book',
        })
        dataInStore.books.push({
          ...response.data.addBook
        })
        store.writeQuery({
          query: FILTER_BOOKS,
          data: dataInStore
        })
      }
    }
  )

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    await addBook({variables: {
      title, author, published: Number(published), genres
    }})
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </div>
  )
}

export default NewBook
