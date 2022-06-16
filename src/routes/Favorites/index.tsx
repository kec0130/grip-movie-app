import { useEffect, useState } from 'react'
import store from 'store'

import { useRecoil } from 'hooks/useRecoil'
import { favoriteMovieState } from 'states/movie'

import Header from 'components/Header'
import MovieItem from 'components/MovieItem'
import Error from 'components/Error'
import styles from './favorites.module.scss'

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [favoriteMovies, setFavoriteMovies] = useRecoil(favoriteMovieState)
  const isError = !isLoading && !favoriteMovies.length

  useEffect(() => {
    setFavoriteMovies(store.get('favoriteMovies') || [])
    setIsLoading(false)
  }, [setFavoriteMovies])

  return (
    <>
      <Header>
        <div className={styles.header}>내 즐겨찾기</div>
      </Header>
      <main>
        {favoriteMovies.map((movie) => (
          <MovieItem key={movie.imdbID} movie={movie} />
        ))}
        {isError && <Error message='즐겨찾기한 영화가 없습니다.' />}
      </main>
    </>
  )
}

export default Favorites
