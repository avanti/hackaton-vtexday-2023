import React from 'react'
import InputMask, { Props } from 'react-input-mask'
import styles from './input.css'

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: React.FC<Props> = (props) => {
  const { className, ...rest } = props

  return <InputMask className={`${className} ${styles.inputStyle}`} {...rest} />

  //return <input className={`${className} ${styles.inputStyle}`} {...rest} />
}

export default Input
