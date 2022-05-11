import { Outlet } from 'react-router-dom'
import GNB from 'components/GNB'
import styles from './pageLayout.module.scss'

const PageLayout = () => {
  return (
    <div className={styles.container}>
      <Outlet />
      <footer>
        <GNB />
      </footer>
    </div>
  )
}

export default PageLayout
