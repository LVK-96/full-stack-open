import React from 'react'
import ReactDOM from 'react-dom'

const Header = (prop) => {
    return (
        <>
            <h1>{prop.course}</h1>
        </>
    ) 
}

const Part = (prop) => {
    return (
        <>
            <p>
                {prop.name} {prop.exercises}
            </p>
        </>
    )
}

const Content = (prop) => {
    return (
        <>
            {prop.parts.map(part => {
                return <Part name={part.name} exercises={part.exercises} />
            })}
        </>
    )
}

const Total = (prop) => {
    return (
        <>
            <p>Number of exercises {prop.exercises.reduce((a, b) => a + b)}</p>
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts}/ >
            <Total exercises={course.parts.map(part => part.exercises)} />
        </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))