import React from 'react'
import { PropTypes } from 'prop-types'

import './new-task-form.css'

function NewTaskForm({ className, placeholder, submitNewTask }) {
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.trim() !== '') {
        submitNewTask(e.target.value)
        e.target.value = ''
      }
    }
  }
  return <input name="newTask" className={className} onKeyDown={onKeyDown} placeholder={placeholder} />
}

NewTaskForm.propTypes = {
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  submitNewTask: PropTypes.func.isRequired,
}

export default NewTaskForm
