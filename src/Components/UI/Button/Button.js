/* file not required */
import React, { Component } from 'react'
import classes from './Button.module.css'
import Button from '@material-ui/core/Button'

const qButton = (props) => {
  const clsBtn = [classes.qButton, classes[props.type]]

  return (
    <Button
      onClick={props.onClick}
      className={clsBtn.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  )
}

export default qButton
