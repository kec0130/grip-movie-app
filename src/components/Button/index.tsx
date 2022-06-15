import { ButtonHTMLAttributes, MouseEventHandler } from 'react'
import cx from 'classnames'
import styles from './button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  buttonStyle?: 'primary' | 'secondary' | 'ghost'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({ value, type = 'button', buttonStyle = 'primary', onClick }: ButtonProps) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={cx(styles.button, styles[buttonStyle])} onClick={onClick}>
      {value}
    </button>
  )
}

export default Button
