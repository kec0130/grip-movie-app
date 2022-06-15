import { Route, Routes } from 'react-router-dom'

import Layout from 'components/Layout'
import Movies from './Movies'
import Favorites from './Favorites'
import NotFound from './NotFound'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Movies />} />
        <Route path='favorites' element={<Favorites />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
