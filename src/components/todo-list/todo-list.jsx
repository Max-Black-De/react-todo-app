import React from 'react'
// import { PropTypes } from 'prop-types'

import { TodoListItem } from '../todo-list-item'

import './todo-list.css'

function TodoList({ sortedTasksData, setTasksData }) {
  // label,
  // minutes,
  // seconds,
  // id: uuid(),
  // done: false,
  // editing: false,
  // isPlay: true,
  // date: new Date(),

  const onToggleProperty = (tasksArr, id, property) => {
    const newTasksArr = tasksArr.map((task) => {
      if (task.id === id) {
        return { ...task, [property]: !task[property] }
      }
      return task
    })
    return newTasksArr
  }

  const onAddEditedTask = (id, label) => {
    setTasksData((tasks) => {
      const newTask = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, label }
        }
        return task
      })
      return newTask
    })
  }

  const onDeleteItem = (id) => {
    setTasksData((tasks) => tasks.filter((task) => task.id !== id))
  }
  const onToggleEdit = (id) => {
    setTasksData((tasks) => onToggleProperty(tasks, id, 'editing'))
  }
  const onToggleDone = (id) => {
    setTasksData((tasks) => onToggleProperty(tasks, id, 'done'))
  }
  const onEditItem = (e, id) => {
    const label = e.target.value
    onAddEditedTask(id, label)
  }
  const onKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      onToggleEdit(id)
    }
  }

  const items = sortedTasksData.map((taskData) => (
    <TodoListItem
      key={taskData.id}
      {...taskData}
      onDeleteItem={onDeleteItem}
      onToggleEdit={onToggleEdit}
      onToggleDone={onToggleDone}
      onEditItem={onEditItem}
      onKeyDown={onKeyDown}
    />
  ))

  return <ul className="todo-list">{items}</ul>
}

// TodoList.propTypes = {
//   editItem: PropTypes.func.isRequired,
//   tasksData: PropTypes.arrayOf.isRequired,
//   onDoneItem: PropTypes.func.isRequired,
//   addItemClass: PropTypes.func.isRequired,
//   onDeleteItem: PropTypes.func.isRequired,
// }

export default TodoList
