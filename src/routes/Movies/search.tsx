import { ChangeEvent, FormEvent } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { inputValueState, keywordState, pageState, searchResultState } from 'states/movie'

import Button from 'components/Button'
import { SearchIcon } from 'assets/svgs'
import styles from './movies.module.scss'

const MovieSearch = () => {
  const [inputValue, setInputValue] = useRecoilState(inputValueState)
  const [keyword, setKeyword] = useRecoilState(keywordState)
  const resetPage = useResetRecoilState(pageState)
  const resetMovies = useResetRecoilState(searchResultState)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.trim() || inputValue === keyword) return

    resetMovies()
    resetPage()
    setKeyword(inputValue)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.inputWrapper}>
        <SearchIcon />
        <input type='text' value={inputValue} onChange={handleInputChange} placeholder='영화 제목을 입력하세요.' />
      </div>
      <Button value='검색' type='submit' buttonStyle='primary' />
    </form>
  )
}

export default MovieSearch
