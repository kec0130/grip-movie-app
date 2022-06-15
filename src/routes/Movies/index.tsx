import { useEffect, useMemo } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { usePrevious } from 'react-use'

import {
  favoriteMovieState,
  keywordState,
  pageState,
  searchResultState,
  selectedMovieState,
  totalCountState,
} from 'states/movie'
import { modalOpenState } from 'states/modal'
import { useFirstRender } from 'hooks'
import { getMovieSearchApi } from 'services/movie'

import Header from 'components/Header'
import Modal from 'components/Modal'
import MovieItem from 'components/MovieItem'
import MovieSearch from './search'
import styles from './movies.module.scss'

const MOVIES_PER_PAGE = 10

const Movies = () => {
  const keyword = useRecoilValue(keywordState)
  const [page, setPage] = useRecoilState(pageState)
  const [totalCount, setTotalCount] = useRecoilState(totalCountState)
  const [movies, setMovies] = useRecoilState(searchResultState)
  const resetMovies = useResetRecoilState(searchResultState)
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(favoriteMovieState)
  const selectedMovie = useRecoilValue(selectedMovieState)
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpenState)

  const firstRender = useFirstRender()
  const lastPage = useMemo(() => Math.ceil(totalCount / MOVIES_PER_PAGE), [totalCount])
  const prevKeyword = usePrevious(keyword)
  const prevPage = usePrevious(page)
  const isFavorite = favoriteMovies.includes(selectedMovie)

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavoriteMovies((prev) => prev.filter((item) => item.imdbID !== selectedMovie.imdbID))
    } else {
      setFavoriteMovies((prev) => [...prev, selectedMovie])
    }
    setIsModalOpen(false)
  }

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
      {isModalOpen && (
        <Modal
          text={isFavorite ? '이 영화를 즐겨찾기에서 삭제할까요?' : '이 영화를 즐겨찾기에 추가할까요?'}
          onConfirm={toggleFavorite}
        />
      )}
    </>
  )
}

export default Movies
