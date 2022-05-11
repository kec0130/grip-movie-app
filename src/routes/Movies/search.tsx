import { ChangeEvent, FormEvent, useEffect } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { inputValueState, keywordState, pageState, searchResultState } from 'states/movie'
import { getMovieSearchApi } from 'services/movie'

import { SearchIcon } from 'assets/svgs'
import styles from './Movies.module.scss'

const MovieSearch = () => {
  const [inputValue, setInputValue] = useRecoilState(inputValueState)
  const [keyword, setKeyword] = useRecoilState(keywordState)
  const [page, setPage] = useRecoilState(pageState)
  const setMovies = useSetRecoilState(searchResultState)
  const resetMovies = useResetRecoilState(searchResultState)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    setKeyword(inputValue)
    setPage(1)
  }

  useEffect(() => {
    const getSearchResult = async () => {
      const response = await getMovieSearchApi({
        s: keyword,
        page,
      })

      if (!response.data.Search) {
        resetMovies()
        return
      }

      setMovies(response.data.Search)
    }

    getSearchResult()
  }, [keyword, page, setMovies, resetMovies])

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.inputWrapper}>
        <SearchIcon />
        <input type='text' value={inputValue} onChange={handleInputChange} placeholder='영화 제목을 입력하세요.' />
      </div>
      <button type='submit'>검색</button>
    </form>
  )
}
export default MovieSearch
