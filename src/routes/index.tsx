import { Route, Routes } from 'react-router-dom'

import Layout from 'components/Layout'
import Error from 'components/Error'
import Movies from './Movies'
import Favorites from './Favorites'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Movies />} />
        <Route path='favorites' element={<Favorites />} />
      </Route>
      <Route path='*' element={<Error message='페이지를 찾을 수 없습니다.' />} />
    </Routes>
  )
}

export default App
