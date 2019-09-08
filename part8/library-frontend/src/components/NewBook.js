import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { GET_BOOKS } from './Books'

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
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook, { loading, error }] = useMutation(
    ADD_BOOK,
    {
      refetchQueries: [{ query: GET_BOOKS }],
      ignoreResults: true
    }
  )

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()

    await addBook({variables: {
      title: title, author: author, published: Number(published), genres: genres
    }})

    setTitle('')
    setPublished('')
    setAuhtor('')
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
            onChange={({ target }) => setAuhtor(target.value)}
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
