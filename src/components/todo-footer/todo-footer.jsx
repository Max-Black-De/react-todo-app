import React from 'react'
import { PropTypes } from 'prop-types'

import { TodoFilterList } from '../todo-filter-list'

import './todo-footer.css'

function TodoFooter({ setTasksData, setTaskStatus, activeCounter, currentStatus }) {
  const onClearCompleted = () => {
    setTasksData((tasksData) => tasksData.filter((task) => !task.done))
  }
  return (
    <footer className="footer">
      <span className="todo-count">{activeCounter} items left</span>
      <TodoFilterList currentStatus={currentStatus} setTaskStatus={setTaskStatus} />
      <button type="button" className="clear-completed" onClick={(e) => onClearCompleted(e)}>
        Clear completed
      </button>
    </footer>
  )
}

TodoFooter.propTypes = {
  setTaskStatus: PropTypes.func.isRequired,
  setTasksData: PropTypes.func.isRequired,
  activeCounter: PropTypes.number.isRequired,
}

export default TodoFooter
