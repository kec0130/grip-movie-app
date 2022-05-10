import { Route, Routes } from 'react-router-dom'
import Movies from './Movies'
import Favorites from './Favorites'
import GNB from 'components/GNB'
import styles from './Routes.module.scss'

const App = () => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='favorites' element={<Favorites />} />
        </Routes>
        <GNB />
      </div>
    </div>
  )
}

export default App
