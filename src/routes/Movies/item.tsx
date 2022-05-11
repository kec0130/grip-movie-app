import { IMovie } from 'types/movie'
import { HeartBorderIcon } from 'assets/svgs'
import styles from './Movies.module.scss'

interface MovieItemProps {
  movie: Omit<IMovie, 'imdbID'>
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const { Poster, Title, Year, Type } = movie

  return (
    <li className={styles.movieWrapper}>
      <div className={styles.movieInfo}>
        <img src={Poster} alt='poster' />
        <div>
          <h3 className={styles.title}>{Title}</h3>
          <div className={styles.year}>{Year}</div>
          <div className={styles.type}>{Type}</div>
        </div>
      </div>
      <div>
        <HeartBorderIcon />
      </div>
    </li>
  )
}
export default MovieItem
