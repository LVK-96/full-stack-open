import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = () => (
        <>
            <h1>give feedback</h1>
        </>
) 

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistic = (props) => (
    <tr>
        <td>{props.text} {props.num}</td>
    </tr>
)

const Statistics = (props) => {
    const { good, neutral, bad } = props
    const all = good + neutral + bad
    const avg = (good - bad)/all
    const positive = parseFloat(100*(good/all)) + '%'
    
    if (all < 1) {
        return (
            <>
                <h1>statistics</h1>
                No feedback given
            </>
        )
    }
    
    return (
        <>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <Statistic text={'good'} num={good} />
                    <Statistic text={'neutral'} num={neutral} />
                    <Statistic text={'bad'} num={bad} />
                    <Statistic text={'all'} num={all} />
                    <Statistic text={'average'} num={avg} />
                    <Statistic text={'positive'} num={positive} />
                </tbody>
            </table>
        </>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = (value) => () => {
        setGood(value)
    }
    
    const handleNeutralClick = (value) => () => {
        setNeutral(value)
    }
    
    const handleBadClick = (value) => () => {
        setBad(value)
    }
    
    return (
        <div>
            <Header />
            <Button handleClick={handleGoodClick(good + 1)} text={'good'} />
            <Button handleClick={handleNeutralClick(neutral + 1)} 
             text={'neutral'} />
            <Button handleClick={handleBadClick(bad + 1)} text={'bad'} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)