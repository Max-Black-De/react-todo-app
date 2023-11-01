import React from 'react'
import { PropTypes } from 'prop-types'

import './new-task-form.css'

function NewTaskForm({ className, placeholder, submitNewTask }) {
  const onSubmit = (e) => {
    e.preventDefault()
    if (e.target.newTask.value.trim() !== '') {
      submitNewTask(e.target.newTask.value)
      e.target.newTask.value = ''
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <input name="newTask" className={className} placeholder={placeholder} />
    </form>
  )
}

NewTaskForm.propTypes = {
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  submitNewTask: PropTypes.func.isRequired,
}

export default NewTaskForm
