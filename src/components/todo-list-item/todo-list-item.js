/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { PropTypes } from 'prop-types'

import './todo-list-item.css'

function TodoListItem(props) {
  const { editItem, addItemClass } = props
  const submitHandler = (event) => {
    event.preventDefault()
    if (event.target.editedTask.value.trim() !== '') {
      editItem(event.target.editedTask.value)
    }
    addItemClass() // вызываем функцию изменения класса кнопки edit
  }
  const onHandleClick = () => {
    addItemClass()
  }

  const { label, done, editing, onDoneItem, onDeleteItem, date } = props
  let liClassName = 'newTask '
  if (done) {
    liClassName += ' completed'
  }
  if (editing) {
    liClassName += ' editing'
  }

  return (
    <li className={liClassName}>
      <div className="view">
        <input type="checkbox" className="toggle" onChange={onDoneItem} />
        <label>
          <span className="description">{label}</span>
          <span className="created">{`Created ${formatDistanceToNow(
            date,
            { includeSeconds: true },
            { addSuffix: true }
          )}`}</span>
        </label>
        <button type="button" onClick={onHandleClick} className="icon icon-edit" />
        <button type="button" onClick={onDeleteItem} className="icon icon-destroy" />
      </div>
      <form onSubmit={submitHandler}>
        <input type="text" className="edit" name="editedTask" defaultValue={label} contentEditable="true" />
      </form>
    </li>
  )
}

TodoListItem.defaultProps = {
  done: false,
  editing: false,
}
TodoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  done: PropTypes.bool,
  editing: PropTypes.bool,
  onDoneItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
}

export default TodoListItem
