import React, { useState } from 'react'
import Select from 'react-select'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { GET_AUTHORS } from './Authors'

const EDIT_AUTHOR = gql`
  mutation EditAuthor(
    $name: String!, $setBornTo: Int!
  ) {
    editAuthor(
      name: $name, setBornTo: $setBornTo
    ) {
      name
      born
    }
  },
`

const SetBirth = ({ authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [editAuthor, { loading, error }] = useMutation(
    EDIT_AUTHOR,
    {
      refetchQueries: [{ query: GET_AUTHORS }],
      ignoreResults: true
    }
  )

  const submit = async (e) => {
    e.preventDefault()
    await editAuthor({variables: {
      name: name.value, setBornTo: Number(year)
    }})

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          Name:
          <Select
            value={name}
            onChange={value => setName(value)}
            options={authors.map(author => ({
              value: author.name,
              label: author.name
            }))}
          />
        </div>
        <div>
          Year:
          <input type='number' value={year}
            onChange={ ({target}) => setYear(target.value) }/>
        </div>
        <div>
          <button type='submit'>Change birth date</button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </div>
  )
}

export default SetBirth
