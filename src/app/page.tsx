'use client'
import Image from 'next/image'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import MovieCard from './components/MovieCard'
import { useFetch } from './customHooks/useFetch'
import { useSearch } from './customHooks/useSearch'
import { useAtom } from 'jotai'
import { favMoviesAtom } from './context/atom'
import Error from './components/Error'

function Home() {

  const { data: movies, error, isError, isLoading } = useFetch()

  const { search, setSearch, data, debouncedSearchData } = useSearch(movies)


  if (isError) {
    return (
      <Error />
    )
  }

  return (
    <main className='max-w-7xl mx-auto min-h-screen px-2 sm:px-4 md:px-6'>
      <Navbar />
      <div className='max-w-7xl px-5 mx-auto'>
        <Searchbar value={search} onChange={(e) => setSearch(e.target.value)} />
        {isLoading ? (
          <h1 className='text-3xl font-bold tracking-wider mt-10'>
            Loading...
          </h1>
        ) : (
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
              <h2>No TV Shows Found</h2>
            )}
          </section>
        )}
      </div>
    </main>
  )
}

export default Home
