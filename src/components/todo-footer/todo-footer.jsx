/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import { PropTypes } from 'prop-types'

import { TodoFilterList } from '../todo-filter-list'

import './todo-footer.css'

function TodoFooter({ setTasksData, setTaskStatus, activeCounter, currentStatus }) {
  const onClearCompleted = (e) => {
    setTasksData((tasksData) => tasksData.filter(task => !task.done))
  }
  
  return (
    <footer className="footer">
      <span className="todo-count">{activeCounter} items left</span>
      <TodoFilterList
        currentStatus={currentStatus}
        setTaskStatus={setTaskStatus}
      />
      <button type="button" className="clear-completed" onClick={(e) => onClearCompleted(e)}>
        Clear completed
      </button>
    </footer>
  )
}

TodoFooter.propTypes = {
  activeCounter: PropTypes.number.isRequired,
  currentStatus: PropTypes.string.isRequired,
}

export default TodoFooter
