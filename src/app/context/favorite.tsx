import { createContext, useContext, useState } from 'react'

type SingleMovieType =  {
    id: number,
    name: string
}

type FavMovieType = {
  favMovies: SingleMovieType[]
  setFavMovies: (movies: SingleMovieType[]) => void
}

const FavMovieContext = createContext<FavMovieType | undefined>(undefined)

export const FavMovieContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const [movies, setMovies] = useState<SingleMovieType[]>([])

  return (
    <FavMovieContext.Provider value={{
        favMovies: movies,
        setFavMovies: (movies) => {
            setMovies(movies)
        },
    }}>
      {children}
    </FavMovieContext.Provider>
  )
}

export const useFavMovieContext = () => {
    const context = useContext(FavMovieContext)
    return context as FavMovieType
}
