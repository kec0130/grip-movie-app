import { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'

import { useRecoil } from 'hooks/useRecoil'
import { pageState, searchResultState } from 'states/movie'
import { IMovie } from 'types/movie'

import MovieItem from 'components/MovieItem'
import Error from 'components/Error'
import Loading from 'components/Loading'

interface SearchResultProps {
  data: IMovie[] | undefined
  isLoading: boolean
  totalCount: number
}

const MOVIES_PER_PAGE = 10

const SearchResult = ({ data, isLoading, totalCount }: SearchResultProps) => {
  const [page, setPage] = useRecoil(pageState)
  const [searchResult] = useRecoil(searchResultState)
  const { ref, inView } = useInView()

  const lastPage = useMemo(() => Math.ceil(totalCount / MOVIES_PER_PAGE), [totalCount])
  const hasNextPage = !isLoading && page < lastPage
  const isError = !isLoading && !data

  useEffect(() => {
    if (!inView) return
    setPage((prev) => prev + 1)
  }, [inView, setPage])

  return (
    <>
      {searchResult && (
        <ul>
          {searchResult.map((movie, index) => {
            const key = `movie-${movie.imdbID}-${index}`
            return <MovieItem key={key} movie={movie} />
          })}
        </ul>
      )}
      {isLoading && <Loading onPageCenter={page === 1} />}
      {isError && <Error message='검색 결과가 없습니다.' />}
      {hasNextPage && <div ref={ref} />}
    </>
  )
}

export default SearchResult
