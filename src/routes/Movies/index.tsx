import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { useRecoil } from 'hooks/useRecoil'
import { keywordState, pageState } from 'states/movie'
import { getMovieSearchApi } from 'services/movie'

import Header from 'components/Header'
import MovieItem from 'components/MovieItem'
import Error from 'components/Error'
import Loading from 'components/Loading'
import SearchForm from './searchForm'

const Movies = () => {
  const [keyword] = useRecoil(keywordState)
  const [page, setPage] = useRecoil(pageState)
  const [showError, setShowError] = useState(true)

  const { data, isLoading } = useQuery(
    ['getMovieSearchApi', keyword],
    () => getMovieSearchApi({ s: keyword, page }).then((res) => res.data.Search),
    {
      refetchOnWindowFocus: false,
      enabled: !!keyword,
    }
  )

  useEffect(() => {
    setShowError(!data)
  }, [data])

  return (
    <>
      <Header>
        <SearchForm />
      </Header>
      <main>
        {isLoading && <Loading />}
        {!isLoading && showError && <Error message='검색 결과가 없습니다.' />}
        <ul>
          {data?.map((movie) => (
            <MovieItem key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </main>
    </>
  )
}

export default Movies
