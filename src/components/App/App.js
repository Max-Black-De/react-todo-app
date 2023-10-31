// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

import NewTaskForm from '../new-task-form'
import TodoList from '../todo-list'
import TodoFooter from '../todo-footer'

import './App.css'

export default class App extends Component {
  keysId = 777

  state = {
    tasks: [],
    status: 'active',
  }

  createItem = (label) => ({
    label,
    // eslint-disable-next-line no-plusplus
    id: this.keysId++,
    done: false,
    editing: false,
    date: new Date(),
  })

  addNewTask = (label) => {
    const newItem = this.createItem(label)
    this.setState(({ tasks }) => ({
      tasks: [...tasks, newItem],
    }))
  }

  editItem = (value, id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((todo) => todo.id === id)
      const oldItem = tasks[idx]
      const editedItem = { ...oldItem, label: value }

      return {
        tasks: [...tasks.slice(0, idx), editedItem, ...tasks.slice(idx + 1)],
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((todo) => todo.id === id)

      return {
        tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
      }
    })
  }

  // eslint-disable-next-line class-methods-use-this
  toggleProperty = (id, arr, propName) => {
    const idx = arr.findIndex((todo) => todo.id === id)
    const oldItem = arr[idx]
    const editedItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    }

    return [...arr.slice(0, idx), editedItem, ...arr.slice(idx + 1)]
  }

  onToggleDone = (id) => {
    this.setState(({ tasks }) => ({
      tasks: this.toggleProperty(id, tasks, 'done'),
    }))
  }

  onToggleEditing = (id) => {
    this.setState(({ tasks }) => ({
      tasks: this.toggleProperty(id, tasks, 'editing'),
    }))
  }

  clearCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((t) => !t.done),
    }))
  }

  getTasks = () => {
    const { tasks, status } = this.state
    if (status === 'Active') {
      return tasks.filter((t) => !t.done)
    }
    if (status === 'Completed') {
      return tasks.filter((t) => t.done)
    }
    return tasks
  }

  sortTasks = (status) => {
    this.setState(() => ({
      status,
    }))
  }

  render() {
    const { tasks, status } = this.state
    const countDone = tasks.filter((el) => !el.done).length
    return (
      <div className="app">
        <section className="todoapp">
          <header className="header">
            <h1>todos2</h1>
            <NewTaskForm className="new-todo" placeholder="What needs to be done?" submitNewTask={this.addNewTask} />
          </header>
          <section className="main">
            <TodoList
              tasksData={this.getTasks()}
              onDeleteItem={this.deleteItem}
              editItem={this.editItem}
              addItemClass={this.onToggleEditing}
              onDoneItem={this.onToggleDone}
            />
            <TodoFooter
              currentStatus={status}
              clearCompleted={this.clearCompleted}
              sortTasks={this.sortTasks}
              footerSpanCounter={countDone}
            />
          </section>
        </section>
      </div>
    )
  }
}
