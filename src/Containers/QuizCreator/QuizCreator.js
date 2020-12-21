import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import {
  createControl,
  Validate,
  validateForm,
} from '../../FormFramework/FormFramework'
import {
  createQuizQuestion,
  finishCreateQuiz,
} from '../../store/actions/quizCreate'
import { connect } from 'react-redux'

function createOptionControl(number) {
  return createControl(
    {
      label: `Variant ${number}`,
      errorMsg: 'Value is empty',
      id: number,
    },
    { required: true }
  )
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: 'Enter question',
        errorMsg: 'Question doesn`t be empty ',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {
  state = {
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls(),
  }

  submitFormHandler = (event) => {
    event.preventDefault()
  }

  addQuestionHandler = (event) => {
    event.preventDefault()

    const quiz = this.props.quiz.concat()
    const index = quiz.length + 1

    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls
    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    }
    this.props.createQuizQuestion(questionItem)
    // quiz.push(questionItem)
    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls(),
    })
  }
  createQuizHandler = (event) => {
    event.preventDefault()
    this.setState({
      quiz: [],
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls(),
    })
    this.props.finishCreateQuiz()
  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = Validate(control.value, control.validation)

    formControls[controlName] = control
    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    })
  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return (
        <>
          <TextField
            error={!control.valid && control.touched ? control.errorMsg : false}
            className={classes.Inputs}
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </>
      )
    })
  }

  selectHandleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      rightAnswerId: +event.target.value,
    })
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Create test</h1>
          <form onSubmit={this.submitFormHandler} className={classes.QuizForm}>
            <div className={classes.Inputs}>{this.renderControls()}</div>

            <Select
              className={classes.Select}
              id="demo-customized-select-native"
              // labelId="Choose right answer"
              variant="outlined"
              value={this.state.rightAnswerId}
              onChange={this.selectHandleChange}
            >
              <option aria-label="None" value="" />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Select>
            <div className={classes.Buttons}>
              <Button
                disabled={!this.state.isFormValid}
                onClick={this.addQuestionHandler}
                variant="contained"
                color="primary"
              >
                Add question
              </Button>
              <Button
                disabled={this.props.quiz.length === 0}
                onClick={this.createQuizHandler}
                variant="contained"
              >
                Create Test
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    quiz: state.quizCreate.quiz,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
