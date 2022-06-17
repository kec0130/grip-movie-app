import { useState } from 'react'

import { useRecoil } from 'hooks/useRecoil'
import { favoriteMovieState } from 'states/movie'
import { IMovie } from 'types/movie'
import { handleImgError } from 'utils/handleImgError'

import Modal from 'components/Modal'
import MovieInfo from 'components/MovieInfo'
import NoImage from 'assets/images/no_image.png'
import { HeartBorderIcon, HeartFillIcon } from 'assets/svgs'
import styles from './movieItem.module.scss'

interface MovieItemProps {
  movie: IMovie
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const { Poster: poster, Title: title, Year: year, Type: type, imdbID } = movie
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [favoriteMovies] = useRecoil(favoriteMovieState)

  const isFavorite = !!favoriteMovies.find((item) => item.imdbID === imdbID)

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <li className={styles.movieWrapper}>
        <button type='button' onClick={openModal} className={styles.movieItem}>
          <div className={styles.movieInfo}>
            <img src={poster} alt='poster' onError={(e) => handleImgError(e, NoImage)} />
            <MovieInfo title={title} year={year} type={type} />
          </div>
          <div>{isFavorite ? <HeartFillIcon className={styles.liked} /> : <HeartBorderIcon />}</div>
        </button>
      </li>
      {isModalOpen && <Modal movie={movie} isFavorite={isFavorite} closeModal={closeModal} />}
    </>
  )
}

export default MovieItem
