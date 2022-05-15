import { Route, Routes } from 'react-router-dom'
import PageLayout from 'components/pageLayout'
import Movies from './pages/movies'
import Favorites from './pages/favorites'
import NotFound from 'pages/notFound'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<PageLayout />}>
        <Route path='/' element={<Movies />} />
        <Route path='favorites' element={<Favorites />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
