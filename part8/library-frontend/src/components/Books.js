import React, { useState } from 'react'
import Select from 'react-select'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const GET_BOOKS = gql`
{
  allBooks {
    title
    published
    genres
    author {
      name
    }
  }
}
`

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState({ label: '', value: '' })
  const { loading, error, data } = useQuery(GET_BOOKS)
  if (loading) return null
  if (error) return error.message

  if (!props.show) {
    return null
  }

  const books = data.allBooks
  const uniqGenres = [...new Set(books.flatMap(book => book.genres))]
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
          {books.filter((book) =>
            book.genres.includes(genreFilter.value)).map(a =>
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
