import React from 'react'
import { PropTypes } from 'prop-types'
import uuid from 'react-uuid'

import './todo-filter-list.css'

function TodoFilterList({ setTaskStatus, currentStatus }) {
  const onChangeTaskStatus = (e) => {
    const status = e.target.innerText
    setTaskStatus(status)
  }
  const filterLabels = ['All', 'Active', 'Completed']
  const button = filterLabels.map((label) => (
    <li key={uuid()}>
      <button
        type="button"
        className={currentStatus === label ? 'selected' : ''}
        onClick={(e) => onChangeTaskStatus(e)}
      >
        {label}
      </button>
    </li>
  ))
  return <ul className="filters">{button}</ul>
}

TodoFilterList.propDefault = {
  currentStatus: 'All',
}

TodoFilterList.propTypes = {
  setTaskStatus: PropTypes.func.isRequired,
  currentStatus: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
}

export default TodoFilterList
