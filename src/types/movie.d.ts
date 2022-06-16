export interface IMovie {
  Title: string
  Year: string
  Type: string
  Poster: string
  imdbID: string
}

export interface IMovieAPIRes {
  Response: 'True' | 'False'
  Search?: IMovie[]
  totalResults?: string
  Error?: string
}
