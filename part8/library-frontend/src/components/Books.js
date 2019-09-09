import React, { useState } from 'react'
import Select from 'react-select'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const FILTER_BOOKS = gql`
  query Books(
    $genre: String
    ) {
    books: allBooks (
      genre: $genre
    ) {
      title
      published
      genres
      author {
        name
      }
    }
    genres: allBooks {
      genres
    }
  }
`

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState({ label: '', value: '' })
  const { loading, error, data } = useQuery(FILTER_BOOKS, {
    variables: { genre: genreFilter.value },
  })

  if (loading) return null
  if (error) return error.message
  if (!props.show) {
    return null
  }

  const books = data.books
  const genres = data.genres
  const uniqGenres = [...new Set(genres.flatMap(book => book.genres))]
  return (
    <div>
      <h2>books</h2>
      <div>
        Genre filter
        <Select
          value={genreFilter}
          onChange={value => setGenreFilter(value)}
          options={uniqGenres.map(genre => ({
            value: genre,
            label: genre
          }))}
        />
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
