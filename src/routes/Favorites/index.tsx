import { useRecoilState, useRecoilValue } from 'recoil'

import { favoriteMovieState, selectedMovieState } from 'states/movie'
import { modalOpenState } from 'states/modal'

import Header from 'components/Header'
import Modal from 'components/Modal'
import MovieItem from 'components/MovieItem'
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
      {isModalOpen && <Modal text='이 영화를 즐겨찾기에서 삭제할까요?' onConfirm={toggleFavorite} />}
    </>
  )
}

export default Favorites
