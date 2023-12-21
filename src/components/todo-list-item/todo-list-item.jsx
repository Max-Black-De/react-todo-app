/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react'
import { formatDistanceToNow } from 'date-fns'
import classNames from 'classnames'
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
    setTasksData,
  } = props

  const liClassName = classNames({ completed: done, editing })
  const totalSeconds = Number(minutes) * 60 + Number(seconds)

  const [isPlay, setIsPlay] = useState('pause')
  const [timeLeft, setTimeLeft] = useState(totalSeconds)

  const setUpdatedTime = (tasksData, min, sec) =>
    tasksData.map((task) => {
      if (task.id === id) {
        return { ...task, minutes: min, seconds: sec }
      }
      return task
    })

  const transformToMinSec = (result) => {
    const min = Math.trunc(result / 60)
    const sec = result - min * 60
    setTasksData((tasksData) => setUpdatedTime(tasksData, min, sec))
  }

  const modernTime = (value) => {
    if (value <= 9) {
      return `0${value}`
    }
    return value
  }

  const correctTime = useCallback(() => transformToMinSec(timeLeft), [timeLeft])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlay && isPlay !== 'pause') {
        setTimeLeft((prev) => (prev >= 1 ? prev - 1 : 0))
      }
      correctTime()
    }, 1000)

    if (timeLeft === 0 || done) {
      setIsPlay('pause')
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [timeLeft, done, isPlay, correctTime])
  return (
    <li className={liClassName}>
      <div className="view">
        <input type="checkbox" name="done" className="toggle" onChange={() => onToggleDone(id)} checked={done} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button type="button" aria-label="Play" onClick={() => setIsPlay('play')} className="icon   icon-play" />
            <button type="button" aria-label="Pause" onClick={() => setIsPlay('pause')} className="icon icon-pause" />
            {`${modernTime(minutes)}:${modernTime(seconds)}`}
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
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
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
