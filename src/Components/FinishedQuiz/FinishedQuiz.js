import React, { Component } from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'Success') {
      total++
    }

    return total
  }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          // HERE WERE quizes
          const clsQuest = [
            'fas',
            props.results[quizItem.id] === 'Error' ? 'fa-times' : 'fa-check',
            classes[props.results[quizItem.id]],
          ]

          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={clsQuest.join(' ')} />
            </li>
          )
        })}
      </ul>
      <p>
        Right answer {successCount}/{props.quiz.length}
        {
          // HERE WERE quizes
        }
      </p>

      <div className={classes.Buttons}>
        <Button onClick={props.onRepeat} variant="contained">
          Repeat
        </Button>
        <Link className={classes.Link} to={'/'}>
          <Button variant="contained" color="primary">
            Forward to list question
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz
