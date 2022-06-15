import { Outlet } from 'react-router-dom'
import GNB from 'components/GNB'
import styles from './layout.module.scss'

const Layout = () => {
  return (
    <div className={styles.container}>
      <Outlet />
      <footer>
        <GNB />
      </footer>
    </div>
  )
}

export default Layout
