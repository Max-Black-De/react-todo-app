/* eslint-disable no-debugger */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import uuid from 'react-uuid'

// import { PropTypes } from 'prop-types'

import './new-task-form.css'

function createTask(label, minutes, seconds) {
  // const min = Number(minutes)
  // const sec = Number(seconds)

  return {
    label,
    minutes,
    seconds,
    id: uuid(),
    done: false,
    editing: false,
    isPlay: true,
    date: new Date(),
  }
}

function NewTaskForm({ setTasksData }) {
  const [task, setTask] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onSetTasksData = (text, min, sec) => {
    setTasksData(tasksData => [...tasksData,  createTask(text, min, sec)])
  }

  const onSetTask = (e) => {
    const { value } = e.target
    setTask(value)
  }

  const onSetMinutes = (e) => {
    const { value } = e.target
    setMinutes(value)
  }

  const onSetSeconds = (e) => {
    const { value } = e.target
    setSeconds(value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const text = e.target[0].value
    const min = e.target[1].value
    const sec = e.target[2].value

    onSetTasksData(text, min, sec)
    setTask('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        name="newTask"
        className="new-todo"
        placeholder="Task"
        value={task}
        onChange={onSetTask}
        required
      />
      <input
        type="number"
        min="0"
        name="newTask"
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={onSetMinutes}
        required
      />
      <input
        type="number"
        min="0"
        max="59"
        name="newTask"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={onSetSeconds}
        required
      />
      <button type="submit" className="visually-hidden" aria-label="Submit" />
    </form>
  )
}

export default NewTaskForm

// NewTaskForm.propTypes = {
//   submitNewTask: PropTypes.func.isRequired,
// }
