import { useRef } from 'react'
import { useClickAway } from 'react-use'

import { useRecoil } from 'hooks/useRecoil'
import { favoriteMovieState } from 'states/movie'
import { IMovie } from 'types/movie'

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

  const addFavoriteMovie = () => {
    setFavoriteMovies((prev) => [...prev, movie])
    store.set('favoriteMovies', favoriteMovies)
  }

  const deleteFavoriteMovie = () => {
    setFavoriteMovies((prev) => prev.filter((item) => item.imdbID !== imdbID))
    store.set('favoriteMovies', favoriteMovies)
  }

  useClickAway(modalRef, closeModal)

  return (
    <ModalPortal>
      <div className={styles.background}>
        <div className={styles.modalWrapper} ref={modalRef}>
          <div className={styles.movieTitle}>{title}</div>
          <div>
            <button type='button' onClick={isFavorite ? deleteFavoriteMovie : addFavoriteMovie}>
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
