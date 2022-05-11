import { Route, Routes } from 'react-router-dom'
import Movies from './Movies'
import Favorites from './Favorites'
import styles from './Routes.module.scss'
import PageLayout from 'components/PageLayout'

const App = () => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<PageLayout />}>
            <Route path='/' element={<Movies />} />
            <Route path='favorites' element={<Favorites />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
