import { ChangeEvent, FormEvent, useState } from 'react'

import { useRecoil } from 'hooks/useRecoil'
import { searchKeywordState, pageState, searchResultState } from 'states/movie'

import { SearchIcon } from 'assets/svgs'
import styles from './movies.module.scss'

const SearchForm = () => {
  const [, , resetPage] = useRecoil(pageState)
  const [, , resetSearchResult] = useRecoil(searchResultState)
  const [searchKeyword, setSearchKeyword] = useRecoil(searchKeywordState)
  const [inputValue, setInputValue] = useState(searchKeyword)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.trim() || inputValue === searchKeyword) return

    resetPage()
    resetSearchResult()
    setSearchKeyword(inputValue)
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
