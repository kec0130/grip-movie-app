import { atom } from 'recoil'
import { IMovie } from 'types/movie'

const keywordState = atom({
  key: 'keywordState',
  default: '',
})

const pageState = atom({
  key: 'pageState',
  default: 1,
})

const searchResultState = atom<IMovie[]>({
  key: 'searchResultState',
  default: [],
})

const inputValueState = atom({
  key: 'inputValueState',
  default: '',
})

export { keywordState, pageState, searchResultState, inputValueState }
