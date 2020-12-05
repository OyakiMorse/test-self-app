import React, { Component } from 'react'
import classes from './MenuToggle.module.css'

const MenuToggle = (props) => {
  const clsToggle = [classes.MenuToggle, 'fas']

  if (props.isOpen) {
    clsToggle.push('fa-times')
    clsToggle.push(classes.open)
  } else {
    clsToggle.push('fa-bars')
  }

  return <i className={clsToggle.join(' ')} onClick={props.onToggle} />
}

export default MenuToggle
