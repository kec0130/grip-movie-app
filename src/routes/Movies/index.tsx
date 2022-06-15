import { useEffect, useMemo } from 'react'
import { usePrevious } from 'react-use'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { keywordState, pageState, searchResultState, totalCountState } from 'states/movie'
import { getMovieSearchApi } from 'services/movie'
import { useFirstRender } from 'hooks'

import Header from 'components/Header'
import MovieItem from 'components/MovieItem'
import SearchForm from './searchForm'
import styles from './movies.module.scss'

const MOVIES_PER_PAGE = 10

const Movies = () => {
  const keyword = useRecoilValue(keywordState)
  const [page, setPage] = useRecoilState(pageState)
  const [totalCount, setTotalCount] = useRecoilState(totalCountState)
  const [movies, setMovies] = useRecoilState(searchResultState)
  const resetMovies = useResetRecoilState(searchResultState)

  const firstRender = useFirstRender()
  const lastPage = useMemo(() => Math.ceil(totalCount / MOVIES_PER_PAGE), [totalCount])
  const prevKeyword = usePrevious(keyword)
  const prevPage = usePrevious(page)

  useEffect(() => {
    if (firstRender) return
    if (keyword === prevKeyword && page === prevPage) return

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
  }, [keyword, page, setMovies, resetMovies, setTotalCount, firstRender, prevKeyword, prevPage])

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
        <SearchForm />
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
