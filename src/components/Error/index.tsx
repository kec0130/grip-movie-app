import { ErrorIcon } from 'assets/svgs'
import styles from './error.module.scss'

interface ErrorProps {
  message: string
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className={styles.error}>
      <ErrorIcon />
      <span>{message}</span>
    </div>
  )
}

export default Error
