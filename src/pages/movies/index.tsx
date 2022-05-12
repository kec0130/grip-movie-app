import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { keywordState, pageState, searchResultState, totalCountState } from 'states/movie'
import { getMovieSearchApi } from 'services/movie'

import Header from 'components/header'
import MovieSearch from './search'
import MovieItem from './item'
import styles from './movies.module.scss'

const Movies = () => {
  const keyword = useRecoilValue(keywordState)
  const [page, setPage] = useRecoilState(pageState)
  const [totalCount, setTotalCount] = useRecoilState(totalCountState)
  const [movies, setMovies] = useRecoilState(searchResultState)
  const resetMovies = useResetRecoilState(searchResultState)

  // TODO: scroll 방식으로 변경
  const handleNextClick = () => {
    if (page >= Math.ceil(totalCount / 10)) return
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    const getSearchResult = async () => {
      const response = await getMovieSearchApi({
        s: keyword,
        page,
      })

      const { Search, totalResults } = response.data

      if (!Search || !totalResults) {
        resetMovies()
        return
      }

      setMovies(Search)
      setTotalCount(Number(totalResults))
    }

    getSearchResult()
  }, [keyword, page, setMovies, resetMovies, setTotalCount])

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
            <button type='button' onClick={handleNextClick}>
              Next
            </button>
          </>
        )}
      </main>
    </>
  )
}

export default Movies
