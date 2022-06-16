import { atom } from 'recoil'
import { IMovie } from 'types/movie'

export const searchKeywordState = atom({
  key: 'searchKeywordState',
  default: '',
})

export const pageState = atom({
  key: 'pageState',
  default: 1,
})

export const searchResultState = atom<IMovie[]>({
  key: 'searchResultState',
  default: [],
})

export const inputValueState = atom({
  key: 'inputValueState',
  default: '',
})

export const favoriteMovieState = atom<IMovie[]>({
  key: 'favoriteMovieState',
  default: [],
})
