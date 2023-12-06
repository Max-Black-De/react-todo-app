import React, { useState } from 'react'

import { NewTaskForm } from '../new-task-form'
import { TodoList } from '../todo-list'
import { TodoFooter } from '../todo-footer'
import './App.css'

const filterTasks = (tasksData, taskStatus) => {
  if (taskStatus !== 'All') {
    const newTasksData = tasksData.filter((task) => {
      if (taskStatus === 'Completed') return task.done
      return !task.done
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

  return (
    <div className="app">
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm setTasksData={setTasksData} />
        </header>
        <section className="main">
          <TodoList sortedTasksData={filteredTasks} setTasksData={setTasksData} />
          <TodoFooter
            currentStatus={taskStatus}
            setTasksData={setTasksData}
            setTaskStatus={setTaskStatus}
            activeCounter={activeCounter}
          />
        </section>
      </section>
    </div>
  )
}

export default App
