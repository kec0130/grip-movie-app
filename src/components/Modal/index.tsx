import { useRef } from 'react'
import { useClickAway } from 'react-use'
import store from 'store'

import { useRecoil } from 'hooks/useRecoil'
import { favoriteMovieState } from 'states/movie'
import { IMovie } from 'types/movie'

import MovieInfo from 'components/MovieInfo'
import ModalPortal from './portal'
import styles from './modal.module.scss'

interface ModalProps {
  movie: IMovie
  isFavorite: boolean
  closeModal: () => void
}

const Modal = ({ movie, isFavorite, closeModal }: ModalProps) => {
  const { Poster: poster, Title: title, Year: year, Type: type, imdbID } = movie
  const [favoriteMovies, setFavoriteMovies] = useRecoil(favoriteMovieState)
  const modalRef = useRef<HTMLDivElement>(null)

  const backgroundPoster = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 80%)), url(${poster})`,
  }

  const addFavoriteMovie = () => {
    const newFavoriteMovies = [movie, ...favoriteMovies]
    setFavoriteMovies(newFavoriteMovies)
    store.set('favoriteMovies', newFavoriteMovies)
  }

  const deleteFavoriteMovie = () => {
    const newFavoriteMovies = favoriteMovies.filter((item) => item.imdbID !== imdbID)
    setFavoriteMovies(newFavoriteMovies)
    store.set('favoriteMovies', newFavoriteMovies)
  }

  const toggleFavorite = () => {
    isFavorite ? deleteFavoriteMovie() : addFavoriteMovie()
    closeModal()
  }

  useClickAway(modalRef, closeModal)

  return (
    <ModalPortal>
      <div className={styles.background}>
        <div className={styles.modalWrapper} ref={modalRef}>
          <div className={styles.poster} style={backgroundPoster}>
            <MovieInfo title={title} year={year} type={type} />
          </div>
          <div>
            <button type='button' onClick={toggleFavorite}>
              {isFavorite ? '즐겨찾기 제거' : '즐겨찾기'}
            </button>
            <button type='button' onClick={closeModal}>
              취소
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  )
}

export default Modal
