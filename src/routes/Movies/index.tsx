import { useState, FormEvent } from 'react'
import { getMovieSearchApi } from 'services/movie'
import { IMovie } from 'types/movie'
import Header from 'components/Header'
import MovieSearch from './search'
import MovieItem from './item'
import styles from './Movies.module.scss'

const Movies = () => {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [inputValue, setInputValue] = useState('')

  const getSearchResult = async (query: string, page: number) => {
    const response = await getMovieSearchApi({
      s: query,
      page,
    })

    if (response.data.Response === 'False') setMovies([])

    setMovies(response.data.Search)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue) return

    getSearchResult(inputValue, 1)
  }

  return (
    <>
      <Header>
        <MovieSearch inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit} />
      </Header>
      <main>
        {!movies.length && <div className={styles.noResult}>검색 결과가 없습니다.</div>}
        <ul>
          {movies.map((movie) => (
            <MovieItem key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </main>
    </>
  )
}
export default Movies
