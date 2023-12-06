/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { useEffect, useState } from 'react'

import { NewTaskForm } from '../new-task-form'
import { TodoList } from '../todo-list'
import { TodoFooter } from '../todo-footer'
import './App.css'

const filterTasks = (tasksData, taskStatus) => {
  if (taskStatus !== 'All') {
    const newTasksData = tasksData.filter((el) => {
      if(taskStatus === 'Completed')
        return el.done
      return !el.done
    })
    return newTasksData
  }
  return tasksData
}

function App() {
  const [tasksData, setTasksData] = useState([])
  const [taskStatus, setTaskStatus] = useState('All')
  const activeCounter = tasksData.filter((el) => !el.done).length
  const filteredTasks = filterTasks(tasksData, taskStatus)
  // useEffect(() => {
  //   console.log(tasksData)
  //   console.log(taskStatus)
  //   console.log(activeCounter)
  // })
  // console.log(tasksData)



  return (
    <div className="app">
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm setTasksData={setTasksData} />
        </header>
        <section className="main">
          <TodoList
            sortedTasksData={filteredTasks}
            setTasksData={setTasksData}
          />
          <TodoFooter
            currentStatus={taskStatus}
            // clearCompleted={this.clearCompleted}
            filterTasks={filterTasks}
            activeCounter={activeCounter}
          />
        </section>
      </section>
    </div>
  )
}

export default App