import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { favoriteMovieState } from 'states/movie'

import Header from 'components/header'
import MovieItem from 'pages/movies/item'

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(favoriteMovieState)

  useEffect(() => {
    setFavoriteMovies(JSON.parse(localStorage.getItem('favoriteMovies') || '[]'))
  }, [setFavoriteMovies])

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies))
  }, [favoriteMovies])

  return (
    <>
      <Header>내 즐겨찾기</Header>
      <main>
        {favoriteMovies.map((movie) => (
          <MovieItem key={movie.imdbID} movie={movie} />
        ))}
        {!favoriteMovies.length && <span>즐겨찾기한 영화가 없습니다.</span>}
      </main>
    </>
  )
}

export default Favorites
