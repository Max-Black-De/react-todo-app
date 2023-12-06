import React from 'react'
import { PropTypes } from 'prop-types'

import { TodoFilterList } from '../todo-filter-list'

import './todo-footer.css'

function TodoFooter({ activeCounter, clearCompleted, filterTasks, currentStatus }) {
  return (
    <footer className="footer">
      <span className="todo-count">{activeCounter} items left</span>
      <TodoFilterList currentStatus={currentStatus} sortTasks={filterTasks} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

TodoFooter.propTypes = {
  activeCounter: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  filterTasks: PropTypes.func.isRequired,
  currentStatus: PropTypes.string.isRequired,
}

export default TodoFooter
