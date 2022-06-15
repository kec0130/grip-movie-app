import { useRecoil } from 'hooks/useRecoil'
import { favoriteMovieState } from 'states/movie'

import Header from 'components/Header'
import MovieItem from 'components/MovieItem'
import styles from './favorites.module.scss'

const Favorites = () => {
  const [favoriteMovies] = useRecoil(favoriteMovieState)

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
