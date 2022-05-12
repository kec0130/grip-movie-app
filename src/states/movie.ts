import { atom } from 'recoil'
import { IMovie } from 'types/movie'

export const keywordState = atom({
  key: 'keywordState',
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

export const totalCountState = atom({
  key: 'totalCountState',
  default: 0,
})

export const inputValueState = atom({
  key: 'inputValueState',
  default: '',
})
