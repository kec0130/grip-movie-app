import Header from 'components/Header'
import { useState, ChangeEvent, FormEvent } from 'react'
import { getMovieSearchApi } from 'services/movie'
import { IMovie } from 'types/movie'

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue) return

    getSearchResult(inputValue, 1)
  }

  return (
    <div>
      <Header>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            placeholder='영화 제목을 입력하세요.'
            style={{ width: '100%', height: '100%' }}
          />
        </form>
      </Header>
      <main>
        <div>
          {!movies.length && <div>검색 결과가 없습니다.</div>}
          <ul>
            {movies.map((item) => {
              const { Poster, Title, Year, Type, imdbID } = item
              return (
                <li key={imdbID}>
                  <div>
                    <img src={Poster} alt='movie poster' />
                  </div>
                  <div>
                    <div>{Title}</div>
                    <div>{Year}</div>
                    <div>{Type}</div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </main>
    </div>
  )
}
export default Movies
