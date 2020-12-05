// File not required yet later delete

import React, { Component } from 'react'
import classes from './Auth.module.css'
import TextField from '@material-ui/core/TextField'

const Input = (props) => {
  const inputType = props.type || 'text'
  const clsInput = [classes.Input]
  const htmlFor = `${inputType}-${Math.random()}`

  return (
    <div className={clsInput.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <TextField
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export default Input
