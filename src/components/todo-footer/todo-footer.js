import React from 'react'
import { PropTypes } from 'prop-types'

import TodoFilterList from '../todo-filter-list'

import './todo-footer.css'

function TodoFooter({ footerSpanCounter, clearCompleted, sortTasks, currentStatus }) {
  return (
    <footer className="footer">
      <span className="todo-count">{footerSpanCounter} items left</span>
      <TodoFilterList currentStatus={currentStatus} sortTasks={sortTasks} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

TodoFooter.propTypes = {
  footerSpanCounter: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  sortTasks: PropTypes.func.isRequired,
  currentStatus: PropTypes.string.isRequired,
}

export default TodoFooter
