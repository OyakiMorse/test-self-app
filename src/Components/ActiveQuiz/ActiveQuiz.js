import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActuveQuiz = (props) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{props.quizNumber}.</strong>&nbsp;
        {props.question}
      </span>
      <small>
        {props.quizNumber}/{props.quizLength}
      </small>
    </p>

    <AnswersList
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
      state={props.state}
    />
  </div>
)

export default ActuveQuiz
