import React from 'react'

const Sum = ({ exercises }) => {
    const s = exercises.reduce((a, b) => a + b)

    return (
        <div>
            <b>total of {s} exercises</b>
        </div>
    )
}

const Part = ({ name, exercises }) => (
    <div>
        {name} {exercises}
    </div>
)

const Content = ({ parts }) => {
    const rows = parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />    
    )
    
    return (
        <div>
            {rows}
        </div>
    )
}

const Header = ({ text }) => <h1>{text}</h1>

const Course = ({ course }) => (
    <div>
        <Header text={course.name} />
        <Content parts={course.parts}/>
        <Sum exercises={course.parts.map(part => part.exercises)}/>
    </div>
)

export default Course