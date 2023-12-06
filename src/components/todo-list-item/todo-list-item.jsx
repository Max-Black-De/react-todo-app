import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import classNames from 'classnames'
// eslint-disable-next-line no-unused-vars
import { PropTypes } from 'prop-types'

import './todo-list-item.css'

function TodoListItem(props) {
  const {
    label,
    minutes,
    seconds,
    done,
    editing,
    date,
    id,
    onEditItem,
    onKeyDown,
    onToggleDone,
    onToggleEdit,
    onDeleteItem,
  } = props
  const liClassName = classNames({ completed: done, editing })

  return (
    <li className={liClassName}>
      <div className="view">
        <input type="checkbox" name="done" className="toggle" onChange={() => onToggleDone(id)} checked={done} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button type="button" aria-label="Play" className="icon icon-play" />
            <button type="button" aria-label="Pause" className="icon icon-pause" />
            {`${minutes}:${seconds}`}
          </span>
          <span className="description">
            {`Created ${formatDistanceToNow(date, { includeSeconds: true }, { addSuffix: true })}`}
          </span>
        </label>
        <button
          type="button"
          name="editing"
          onClick={() => onToggleEdit(id)}
          className="icon icon-edit"
          aria-label="Edit"
          disabled={done}
        />
        <button type="button" onClick={() => onDeleteItem(id)} className="icon icon-destroy" aria-label="Delete" />
      </div>
      <input
        onChange={(e) => onEditItem(e, id)}
        onKeyDown={(e) => onKeyDown(e, id)}
        type="text"
        className="edit"
        name="editedTask"
        defaultValue={label}
        contentEditable="true"
      />
    </li>
  )
}
export default TodoListItem

TodoListItem.defaultProps = {
  done: false,
  editing: false,
}
TodoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  done: PropTypes.bool,
  editing: PropTypes.bool,
  date: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.string.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
}
