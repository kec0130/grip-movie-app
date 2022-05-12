import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { favoriteMovieState } from 'states/movie'
import { IMovie } from 'types/movie'

import { HeartBorderIcon, HeartFillIcon } from 'assets/svgs'
import styles from './movies.module.scss'

interface MovieItemProps {
  movie: IMovie
}

const NO_IMAGE_URL = 'https://via.placeholder.com/150x210/B2B2B2/FFFFFF?text=No+Image'

const MovieItem = ({ movie }: MovieItemProps) => {
  const { Poster, Title, Year, Type, imdbID } = movie
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(favoriteMovieState)
  const [isLiked, setIsLiked] = useState(favoriteMovies.includes(movie))

  const handleLikeClick = () => {
    if (isLiked) {
      setFavoriteMovies((prev) => prev.filter((item) => item.imdbID !== imdbID))
    } else {
      setFavoriteMovies((prev) => [...prev, movie])
    }

    setIsLiked((prev) => !prev)
  }

  useEffect(() => {
    setFavoriteMovies(JSON.parse(localStorage.getItem('favoriteMovies') || '[]'))
  }, [setFavoriteMovies])

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies))
  }, [favoriteMovies])

  return (
    <li className={styles.movieWrapper}>
      <div className={styles.movieInfo}>
        <img src={Poster === 'N/A' ? NO_IMAGE_URL : Poster} alt='poster' />
        <div>
          <h3 className={styles.title}>{Title}</h3>
          <div className={styles.year}>{Year}</div>
          <div className={styles.type}>{Type}</div>
        </div>
      </div>
      <button type='button' onClick={handleLikeClick} aria-label='like button'>
        {isLiked ? <HeartFillIcon /> : <HeartBorderIcon />}
      </button>
    </li>
  )
}

export default MovieItem
