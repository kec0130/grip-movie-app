import { useState } from 'react'
import { useQuery } from 'react-query'

import { useRecoil } from 'hooks/useRecoil'
import { searchKeywordState, pageState, searchResultState } from 'states/movie'
import { getMovieSearchApi } from 'services/movie'

import Header from 'components/Header'
import SearchForm from './searchForm'
import SearchResult from './SearchResult'

const Movies = () => {
  const [page] = useRecoil(pageState)
  const [searchKeyword] = useRecoil(searchKeywordState)
  const [, setSearchResult] = useRecoil(searchResultState)
  const [totalCount, setTotalCount] = useState(0)

  const { data, isLoading } = useQuery(
    ['getMovieSearchApi', searchKeyword, page],
    () =>
      getMovieSearchApi({ s: searchKeyword, page }).then((res) => {
        setTotalCount(Number(res.data.totalResults || 0))
        return res.data.Search
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!searchKeyword,
      onSuccess: (currentData): void => {
        if (!currentData) return
        setSearchResult((prev) => [...prev, ...currentData])
      },
    }
  )

  return (
    <>
      <Header>
        <SearchForm />
      </Header>
      <main>
        <SearchResult data={data} isLoading={isLoading} totalCount={totalCount} />
      </main>
    </>
  )
}

export default Movies
