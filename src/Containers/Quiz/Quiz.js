import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz'
import Loader from '../../Components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {
  fetchQuizByID,
  quizAnswerClick,
  repeatQuiz,
} from '../../store/actions/quizAction'
class Quiz extends Component {
  // state = {
  //   results: {},
  //   isFinished: false,
  //   activeQuestion: 0,
  //   answerState: null, // {[id]: 'success ' 'error'/}
  //   quizes: [], TODO: rename
  //   loading: true,
  // }
  componentWillUnmount() {
    this.props.repeatQuiz()
  }
  componentDidMount() {
    console.log(this.props.match.params.id)
    this.props.fetchQuizByID(this.props.match.params.id)
  }
  render() {
    console.log(this.props)
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>To answer question</h1>

          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRepeat={this.props.repeatQuiz}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.props.quizAnswerClick}
              quizLength={this.props.quiz.length}
              quizNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz, // REname quizes
    loading: state.quiz.loading,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizByID: (id) => dispatch(fetchQuizByID(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    repeatQuiz: () => dispatch(repeatQuiz()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
