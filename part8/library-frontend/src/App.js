import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'

const ME = gql`
{
  me {
    username
    favourite
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const { loading, error, data } = useQuery(ME)

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
