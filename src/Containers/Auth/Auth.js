import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { auth } from '../../store/actions/authAction'
import { connect } from 'react-redux'

function validateEmail(email) {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMsg: 'Enter valid email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMsg: 'Enter valid password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLengthPsd: 6,
        },
      },
    },
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  signUpHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  }

  formSubmitHandler = (event) => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true
    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }
    if (validation.minLengthPsd) {
      isValid = value.length >= validation.minLengthPsd && isValid
    }

    // console.log(isValid)
    return isValid
  }

  onChangeIHandler = (event, controlName) => {
    // console.log(`${controlName}:`, event.target.value)
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls,
      isFormValid,
    })
  }

  isInvalid({ valid, touched, shouldValidate }) {
    return !valid && shouldValidate && touched
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      const txtValid = <span>{control.errorMsg}</span>
      return (
        <>
          <TextField
            variant="outlined"
            key={controlName + index}
            touched={control.touched}
            type={control.type}
            value={control.value}
            valid={control.valid}
            label={control.label}
            error={!control.valid && control.touched ? txtValid : false}
            shouldValidate={!!control.validation}
            onChange={(event) => this.onChangeIHandler(event, controlName)}
          />
        </>
      )
    })
  }

  render() {
    // const idInput = `${classes.TextFields}-${Math.round(Math.random() * 10)}`

    return (
      <div className={classes.Auth}>
        <div>
          <h1>Welcome to TestSelf</h1>
          <form
            action="GET"
            onSubmit={this.formSubmitHandler}
            className={classes.AuthForm}
          >
            <div className={classes.TextFields}>{this.renderInputs()}</div>

            <div className={classes.Buttons}>
              <Button
                onClick={this.loginHandler}
                color="primary"
                disabled={!this.state.isFormValid}
              >
                Log in
              </Button>
              <Button
                onClick={this.signUpHandler}
                variant="contained"
                disabled={!this.state.isFormValid}
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) =>
      dispatch(auth(email, password, isLogin)),
  }
}

export default connect(null, mapDispatchToProps)(Auth)
