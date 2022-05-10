import styles from './Header.module.scss'

interface HeaderProps {
  children: JSX.Element | string
}

const Header = ({ children }: HeaderProps) => {
  return <header className={styles.header}>{children}</header>
}

export default Header
