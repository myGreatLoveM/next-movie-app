import { useAtom } from "jotai"
import { favMoviesAtom } from "../context/atom"

export const useFavMovies = () => {
  const [favMovies, setFavMovies] = useAtom(favMoviesAtom)

  function addToFav(movie: MovieType) {
    setFavMovies((prev) => [...prev, movie])
  }

  function removeFromFav(movie: MovieType) {
    setFavMovies((prev) => prev.filter((fav) => fav.id !== movie.id))
  }

  return { favMovies, addToFav, removeFromFav }
}