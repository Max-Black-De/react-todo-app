import React from 'react'
import { PropTypes } from 'prop-types'
// eslint-disable-next-line import/no-extraneous-dependencies
import uuid from 'react-uuid'

import './todo-filter-list.css'

function TodoFilterList({ sortTasks, currentStatus }) {
  const filterLabels = ['All', 'Active', 'Completed']
  const button = filterLabels.map((label) => (
    <li key={uuid()}>
      <button
        type="button"
        className={currentStatus === label ? 'selected' : ''}
        onClick={(e) => sortTasks(e.target.innerText)}
      >
        {label}
      </button>
    </li>
  ))

  return <ul className="filters">{button}</ul>
}
TodoFilterList.propDefault = {
  currentStatus: 'active',
}

TodoFilterList.propTypes = {
  sortTasks: PropTypes.func.isRequired,
  currentStatus: PropTypes.oneOf(['active', 'All', 'Active', 'Completed']).isRequired,
}

export default TodoFilterList
