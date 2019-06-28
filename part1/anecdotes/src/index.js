import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <>
        <h1>{props.text}</h1>
    </>
)

const Anecdote = (props) => (
    <div>
        {props.text}
    </div>
)

const Votes = (props) => (
    <div>
        has {props.votes} votes
    </div>
)

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))

    const randomAnecdote = () => () => {
        const r = Math.floor(Math.random() * anecdotes.length)
        setSelected(r)
    }

    const vote = () => () => {
        const new_votes = [...votes]
        new_votes[selected]++
        setVote(new_votes)
    }

    const max_i = votes.indexOf(Math.max(...votes))

    return (
        <div>
            <Header text={"Anecdote of the day"} />
            <Anecdote text={props.anecdotes[selected]} />
            <Votes votes={votes[selected]} />
            <Button handleClick={randomAnecdote()} text={"next anecdote"} />
            <Button handleClick={vote()} text={"vote"} />
            <Header text={"Anecdote with most votes"}/>
            <Anecdote text={props.anecdotes[max_i]} />
            <Votes votes={votes[max_i]} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
