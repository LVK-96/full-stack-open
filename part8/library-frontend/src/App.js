import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books, { FILTER_BOOKS } from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended, { RECOMMENDED } from './components/Recommended'

const ME = gql`
{
  me {
    username
    favourite
  }
}
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const { loading, error, data } = useQuery(ME)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      const dataInStore1 = client.readQuery({
        query: FILTER_BOOKS,
        variables: { genre: '' }
      })
      dataInStore1.genres.push({
        genres: addedBook.genres,
        __typename: 'Book',
      })
      dataInStore1.books.push({
        ...addedBook
      })
      client.writeQuery({
        query: FILTER_BOOKS,
        data: dataInStore1
      })

      if (addedBook.genres.includes(user.favourite)) {
        const dataInStore2 = client.readQuery({
          query: RECOMMENDED,
          variables: { genre: user.favourite }
        })
        dataInStore2.allBooks.push({
          ...addedBook
        })
        client.writeQuery({
          query: RECOMMENDED,
          data: dataInStore2
        })
      }
    }
  })

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('user-token')
    if (tokenFromLocalStorage)
      setToken(tokenFromLocalStorage)
  }, [])

  if (loading) return null
  if (error) return error.message

  const user = data.me

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Recommended
        show={page === 'recommended'} user={user}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'} token={token} setToken={setToken}
      />

    </div>
  )
}

export default App
