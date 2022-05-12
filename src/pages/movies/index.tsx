import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { keywordState, pageState, searchResultState } from 'states/movie'
import { getMovieSearchApi } from 'services/movie'

import Header from 'components/header'
import MovieSearch from './search'
import MovieItem from './item'
import styles from './movies.module.scss'

const Movies = () => {
  const keyword = useRecoilValue(keywordState)
  const [page, setPage] = useRecoilState(pageState)
  const [movies, setMovies] = useRecoilState(searchResultState)
  const resetMovies = useResetRecoilState(searchResultState)

  const handleClick = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    const getSearchResult = async () => {
      const response = await getMovieSearchApi({
        s: keyword,
        page,
      })

      if (!response.data.Search) {
        resetMovies()
        return
      }

      setMovies(response.data.Search)
    }

    getSearchResult()
  }, [keyword, page, setMovies, resetMovies])

  return (
    <>
      <Header>
        <MovieSearch />
      </Header>
      <main>
        {!movies.length ? (
          <div className={styles.noResult}>검색 결과가 없습니다.</div>
        ) : (
          <>
            <ul>
              {movies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} />
              ))}
            </ul>
            <button type='button' onClick={handleClick}>
              Next
            </button>
          </>
        )}
      </main>
    </>
  )
}

export default Movies
