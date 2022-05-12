import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { favoriteMovieState } from 'states/movie'

import Header from 'components/header'
import MovieItem from 'pages/movies/item'
import styles from './favorites.module.scss'

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(favoriteMovieState)

  useEffect(() => {
    setFavoriteMovies(JSON.parse(localStorage.getItem('favoriteMovies') || '[]'))
  }, [setFavoriteMovies])

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies))
  }, [favoriteMovies])

  return (
    <>
      <Header>
        <div className={styles.header}>내 즐겨찾기</div>
      </Header>
      <main>
        {favoriteMovies.map((movie) => (
          <MovieItem key={movie.imdbID} movie={movie} />
        ))}
        {!favoriteMovies.length && <div className={styles.noResult}>즐겨찾기한 영화가 없습니다.</div>}
      </main>
    </>
  )
}

export default Favorites
