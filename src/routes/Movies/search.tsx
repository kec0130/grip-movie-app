import { Dispatch, ChangeEvent, FormEvent } from 'react'
import { SearchIcon } from 'assets/svgs'
import styles from './Movies.module.scss'

interface MovieSearchProps {
  inputValue: string
  setInputValue: Dispatch<React.SetStateAction<string>>
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const MovieSearch = ({ inputValue, setInputValue, handleSubmit }: MovieSearchProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

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
