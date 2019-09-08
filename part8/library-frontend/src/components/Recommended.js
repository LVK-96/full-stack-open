import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const RECOMMENDED = gql`
  query Recommended ($genre: String) {
    allBooks (genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    },
  }
`

const Recommended = (props) => {
  const { loading, error, data } = useQuery(RECOMMENDED, {
    variables: { genre: props.user.favourite }
  })

  if (loading) return null
  if (error) return error.message

  if (!props.show) {
    return null
  }

  const user = props.user
  const books = data.allBooks
  return (
    <div>
      <h2>Recommended books</h2>
      <div>
        {`Books in your favourite genre ${user.favourite}`}
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
            book.genres.includes(user.favourite)).map(a =>
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

export default Recommended
