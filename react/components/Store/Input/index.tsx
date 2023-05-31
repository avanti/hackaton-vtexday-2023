import React from 'react'
import styles from './input.css'

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: React.FC<InputProps> = (props) => {
  const { className, ...rest } = props

  return <input className={`${className} ${styles.inputStyle}`} {...rest} />
}

export default Input
