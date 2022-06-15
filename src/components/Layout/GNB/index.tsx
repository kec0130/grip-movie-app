import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import { SearchIcon, HeartBorderIcon } from 'assets/svgs'
import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <footer>
      <nav className={styles.gnb}>
        <ul>
          <li>
            <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
              <SearchIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to='favorites' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
              <HeartBorderIcon />
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default GNB
