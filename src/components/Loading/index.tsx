import cx from 'classnames'
import styles from './loading.module.scss'

interface LoadingProps {
  onPageCenter: boolean
}

const Loading = ({ onPageCenter }: LoadingProps) => {
  return <div className={cx(styles.spinner, { [styles.center]: onPageCenter })} />
}

export default Loading
