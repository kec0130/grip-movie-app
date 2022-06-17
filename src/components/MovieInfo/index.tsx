import styles from './movieInfo.module.scss'

interface MovieInfoProps {
  title: string
  year: string
  type: string
}

const MovieInfo = ({ title, year, type }: MovieInfoProps) => {
  return (
    <div className={styles.movieInfo}>
      <h3>{title}</h3>
      <span>{year}</span>
      <span>{type}</span>
    </div>
  )
}

export default MovieInfo
