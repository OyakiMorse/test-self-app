import React, { Component } from 'react'
import classes from './AnswerItem.module.css'

const AnswerItem = (props) => {
  const clsRes = [classes.AnswerItem]
  if (props.state) {
    clsRes.push(classes[props.state])
  }

  return (
    <li
      className={clsRes.join(' ')}
      onClick={() => props.onAnswerClick(props.answer.id)}
      state={props.state}
    >
      {props.answer.text}
    </li>
  )
}

export default AnswerItem
