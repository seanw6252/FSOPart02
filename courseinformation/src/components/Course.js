import React from 'react'

const Sum = ({ parts }) => <p><strong>total of {parts.reduce((runTotal, part) => (runTotal + part.exercises), 0)} exercises</strong></p>

const Part = ({ name, exercises }) => <li>{name} {exercises}</li>

const Header = ({ name }) => <h2>{name}</h2>

const Course = ({course}) => {
  return (
    <li>
      <Header name={course.name}/>
      <ul>
        {course.parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
      </ul>
      <Sum parts={course.parts}/>
    </li>
  )
}

export default Course;