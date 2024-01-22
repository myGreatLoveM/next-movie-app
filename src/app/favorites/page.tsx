'use client'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import { useSearch } from '../customHooks/useSearch'
import { useAtom } from 'jotai'
import { favMoviesAtom } from '../context/atom'
import MovieCard from '../components/MovieCard'
import { useFavMovies } from '../customHooks/useFavMovies'

type Props = {}

export default function page({}: Props) {

  const { favMovies, addToFav, removeFromFav } = useFavMovies()


  const { search, setSearch, data, debouncedSearchData } = useSearch(favMovies)

  return (
    <main className='max-w-7xl mx-auto min-h-screen px-2 sm:px-4 md:px-6'>
      <Navbar />
      <div className='max-w-7xl px-5 mx-auto'>
        <Searchbar value={search} onChange={(e) => setSearch(e.target.value)} />
        <section className='mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {debouncedSearchData?.length !== 0 ? (
            debouncedSearchData?.map((movie, i) => (
              <div key={i} className='flex items-center justify-center mb-5'>
                <MovieCard
                  id={movie.id}
                  key={movie.id}
                  url={movie.image.original}
                  name={movie.name}
                  rating={movie.rating.average}
                  year={movie.premiered.split('-')[0]}
                  movie={movie}
                />
              </div>
            ))
          ) : (
            <h2 className='text-2xl font-semibold'>No Favorite Movies</h2>
          )}
        </section>
      </div>
    </main>
  )
}
