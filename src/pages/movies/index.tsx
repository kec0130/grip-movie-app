import { useEffect, useMemo } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { keywordState, pageState, searchResultState, totalCountState } from 'states/movie'
import { getMovieSearchApi } from 'services/movie'

import Header from 'components/header'
import MovieSearch from './search'
import MovieItem from './item'
import styles from './movies.module.scss'

const MOVIES_PER_PAGE = 10

const Movies = () => {
  const keyword = useRecoilValue(keywordState)
  const [page, setPage] = useRecoilState(pageState)
  const [totalCount, setTotalCount] = useRecoilState(totalCountState)
  const [movies, setMovies] = useRecoilState(searchResultState)
  const resetMovies = useResetRecoilState(searchResultState)
  const lastPage = useMemo(() => Math.ceil(totalCount / MOVIES_PER_PAGE), [totalCount])

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

      setMovies((prev) => [...prev, ...Search])
      setTotalCount(Number(totalResults))
    }

    getSearchResult()
  }, [keyword, page, setMovies, resetMovies, setTotalCount])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + Math.ceil(window.scrollY) < document.body.offsetHeight || page >= lastPage) return
      setPage((prev) => prev + 1)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastPage, page, setPage])

  return (
    <>
      <Header>
        <MovieSearch />
      </Header>
      <main>
        <ul>
          {movies.map((movie) => (
            <MovieItem key={movie.imdbID} movie={movie} />
          ))}
        </ul>
        {!movies.length && <div className={styles.noResult}>검색 결과가 없습니다.</div>}
      </main>
    </>
  )
}

export default Movies
