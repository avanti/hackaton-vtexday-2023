import React from 'react'
import styles from './button.module.css'

type defaultSizeOptions = 'none' | 'small' | 'medium' | 'large'
type sizesOptions = 'default' | 'large' | 'small'

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  borderRadius?: defaultSizeOptions
  buttonPadding?: defaultSizeOptions
  buttonSize?: sizesOptions
  childrenOrder?: 'asc' | 'desc'
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children = 'Default text',
    buttonPadding = 'medium',
    borderRadius = 'none',
    childrenOrder = 'asc',
    ...rest
  } = props

  return (
    <button
      className={`
          ${styles.vanillaButton} 
          ${styles[`borderRadius--${borderRadius}`]}
          ${styles[`buttonPadding--${buttonPadding}`]}
          ${styles[`childrenOrder--${childrenOrder}`]}
        `}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
