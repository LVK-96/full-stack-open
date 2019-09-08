import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const LOGIN  = gql`
  mutation Login(
    $username: String!, $password: String!
  ) {
    login(
      username: $username, password: $password
    ) {
      value
    }
  },
`

const Login = ({ show, token, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { loading, error }] = useMutation(
    LOGIN,
  )
  const handleLogin = async (e) => {
    e.preventDefault()
    const tokenFromLogin = await login({ variables: {
      username: username, password: password
    }})
    const newToken = tokenFromLogin.data.login.value
    setToken(newToken)
    localStorage.setItem('user-token', newToken)
  }

  if (!show) {
    return null;
  }

  if (token) {
    return (
      <div>
        You are already logged in
      </div>
    )
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id='username'
            onChange={ ({target}) => setUsername(target.value) }/>
        </div>
        <div>
          password
          <input id='password' type='password'
            onChange={ ({target}) => setPassword(target.value) }/>
        </div>
        <button type='submit'>login</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </div>
  )
}

export default Login
