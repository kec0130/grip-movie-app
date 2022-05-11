import { useRecoilValue } from 'recoil'
import { searchResultState } from 'states/movie'

import Header from 'components/Header'
import MovieSearch from './search'
import MovieItem from './item'
import styles from './Movies.module.scss'

const Movies = () => {
  const movies = useRecoilValue(searchResultState)

  return (
    <>
      <Header>
        <MovieSearch />
      </Header>
      <main>
        {!movies.length && <div className={styles.noResult}>검색 결과가 없습니다.</div>}
        <ul>
          {movies.map((movie) => (
            <MovieItem key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </main>
    </>
  )
}
export default Movies
