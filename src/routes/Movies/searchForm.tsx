import { ChangeEvent, FormEvent, useState } from 'react'

import { useRecoil } from 'hooks/useRecoil'
import { keywordState, pageState, searchResultState } from 'states/movie'

import { SearchIcon } from 'assets/svgs'
import styles from './movies.module.scss'

const SearchForm = () => {
  const [keyword, setKeyword] = useRecoil(keywordState)
  const [inputValue, setInputValue] = useState(keyword)
  const [, , resetPage] = useRecoil(pageState)
  const [, , resetMovies] = useRecoil(searchResultState)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    resetMovies()
    resetPage()
    setKeyword(inputValue)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.inputWrapper}>
        <SearchIcon />
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          placeholder='영화 제목을 영어로 입력하세요.'
        />
      </div>
    </form>
  )
}

export default SearchForm
