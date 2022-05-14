import { useRecoilValue, useSetRecoilState } from 'recoil'
import { favoriteMovieState, selectedMovieState } from 'states/movie'
import { IMovie } from 'types/movie'

import { HeartBorderIcon, HeartFillIcon } from 'assets/svgs'
import NoImage from 'assets/images/no_image.png'
import styles from './movies.module.scss'
import { modalOpenState } from 'states/modal'

interface MovieItemProps {
  movie: IMovie
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const { Poster, Title, Year, Type } = movie
  const favoriteMovies = useRecoilValue(favoriteMovieState)
  const setSelectedMovie = useSetRecoilState(selectedMovieState)
  const setIsModalOpen = useSetRecoilState(modalOpenState)

  const handleMovieClick = () => {
    setIsModalOpen(true)
    setSelectedMovie(movie)
  }

  return (
    <li className={styles.movieWrapper}>
      <button type='button' onClick={handleMovieClick} className={styles.movieItem}>
        <div className={styles.movieInfo}>
          <img src={Poster === 'N/A' ? NoImage : Poster} alt='poster' />
          <div className={styles.movieInfoText}>
            <h3>{Title}</h3>
            <div>{Year}</div>
            <div>{Type}</div>
          </div>
        </div>
        {favoriteMovies.includes(movie) ? <HeartFillIcon /> : <HeartBorderIcon />}
      </button>
    </li>
  )
}

export default MovieItem
