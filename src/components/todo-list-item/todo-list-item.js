/* eslint-disable jsx-a11y/control-has-associated-label */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { PropTypes } from 'prop-types'

import './todo-list-item.css'

export default class TodoListItem extends Component {
  submitHandler = (event) => {
    const { editItem, addItemClass } = this.props
    event.preventDefault()
    if (event.target.editedTask.value.trim() !== '') {
      editItem(event.target.editedTask.value)
    }
    addItemClass()
  }

  onHandleClick = () => {
    const { addItemClass } = this.props
    addItemClass()
  }

  render() {
    const { label, done, editing, onDoneItem, onDeleteItem, date } = this.props
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
          <button disabled={done} type="button" onClick={this.onHandleClick} className="icon icon-edit" />
          <button type="button" onClick={onDeleteItem} className="icon icon-destroy" />
        </div>
        <form onSubmit={this.submitHandler}>
          <input type="text" className="edit" name="editedTask" defaultValue={label} contentEditable="true" />
        </form>
      </li>
    )
  }
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
