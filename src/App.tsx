import { Route, Routes } from 'react-router-dom'
import Movies from './pages/movies'
import Favorites from './pages/favorites'
import PageLayout from 'components/pageLayout'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<PageLayout />}>
        <Route path='/' element={<Movies />} />
        <Route path='favorites' element={<Favorites />} />
      </Route>
    </Routes>
  )
}

export default App
