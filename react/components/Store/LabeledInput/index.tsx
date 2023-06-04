import React from 'react'
import styles from './input.css'

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string
}

const Input: React.FC<InputProps> = (props) => {
  const { className, label, ...rest } = props

  return (
    <label className={styles.labelStyle}>
      {label}
      <input className={`${className} ${styles.inputStyle}`} {...rest} />
    </label>
  )
}

export default Input
