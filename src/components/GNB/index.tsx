import cx from 'classnames'
import { NavLink } from 'react-router-dom'
import { SearchIcon, HeartBorderIcon } from 'assets/svgs'
import styles from './GNB.module.scss'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <SearchIcon />
            검색
          </NavLink>
        </li>
        <li>
          <NavLink to='favorites' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <HeartBorderIcon />
            즐겨찾기
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default GNB
