import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { favoriteMovieState, selectedMovieState } from 'states/movie'
import { modalOpenState } from 'states/modal'

import Header from 'components/header'
import MovieItem from 'pages/movies/item'
import Modal from 'components/modal'
import styles from './favorites.module.scss'

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(favoriteMovieState)
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpenState)
  const selectedMovie = useRecoilValue(selectedMovieState)

  const toggleFavorite = () => {
    if (favoriteMovies.includes(selectedMovie)) {
      setFavoriteMovies((prev) => prev.filter((item) => item.imdbID !== selectedMovie.imdbID))
    } else {
      setFavoriteMovies((prev) => [...prev, selectedMovie])
    }
    setIsModalOpen(false)
  }

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
      {isModalOpen && <Modal text='즐겨찾기에서 삭제하시겠습니까?' onConfirm={toggleFavorite} />}
    </>
  )
}

export default Favorites
