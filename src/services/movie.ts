import axios from 'axios'
import { IMovieAPIRes } from 'types/movie'

const BASE_URL = 'http://www.omdbapi.com/'

interface Params {
  s: string
  page: number
}

export const getMovieSearchApi = (params: Params) =>
  axios.get<IMovieAPIRes>(BASE_URL, {
    params: {
      ...params,
      apikey: process.env.REACT_APP_API_KEY,
    },
  })
