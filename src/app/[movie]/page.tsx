'use client'
import Link from 'next/link'
import { useFetchMovie } from '../customHooks/useFetch'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import parse from 'html-react-parser'
import { FaStar } from 'react-icons/fa'
import { CiBookmark } from 'react-icons/ci'
import Error from '../components/Error'
import { useFavMovies } from '../customHooks/useFavMovies'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { IoBookmark } from 'react-icons/io5'

type Props = {}

export default function page({
  params,
}: {
  params: { movie: string | number }
}) {
  const { favMovies, addToFav, removeFromFav } = useFavMovies()

  const { data, isLoading, isError, error } = useFetchMovie(params.movie)

  const [animationParent] = useAutoAnimate()

  const isFav = favMovies.some((fav) => fav.id === data?.id)

  function handleFavMovies() {
    if (isFav) {
      removeFromFav(data!)
    } else {
      addToFav(data!)
    }
  }

  if (isError) {
    return <Error />
  }

  return (
    <main className='max-w-7xl mx-auto min-h-screen px-2 sm:px-4 md:px-6  flex flex-col gap-4 '>
      <Navbar />
      <div className='px-5 flex flex-col justify-between gap-10 '>
        <Link
          href={'/'}
          className='border px-6 py-1.5 rounded hover:opacity-80 w-fit'
        >
          Back
        </Link>
        {isLoading ? (
          <h1 className='text-3xl font-bold tracking-wider'>Loading...</h1>
        ) : (
          <section className='flex lg:justify-between justify-center items-center sm:p-5 lg:px-0'>
            <div className='grid lg:grid-cols-2 gap-8 '>
              <div className='relative'>
                <button
                  ref={animationParent}
                  className={`absolute z-10 right-2 top-1 cursor-pointer h-7 w-7 ${
                    isFav ? 'bg-black/90' : 'bg-black/60'
                  } rounded-full flex justify-center items-center ${
                    isFav ? 'hover:bg-black/60' : 'hover:bg-black/90'
                  }`}
                  onClick={handleFavMovies}
                >
                  {isFav ? <IoBookmark /> : <CiBookmark />}
                </button>
                <Image
                  src={data?.image.original ?? ''}
                  width={600}
                  height={600}
                  alt='movie'
                  className='w-[528px] h-[339px] object-cover rounded-md overflow-hidden'
                />
              </div>
              <article className='w-full max-w-[500px] flex flex-col gap-3'>
                <h2 className='text-4xl font-bold'>{data?.name}</h2>
                <p>{parse(data?.summary ?? '')}</p>
                <div className='flex gap-4 items-center text-gray-500'>
                  <p>{data?.premiered.split('-')[0]}</p>
                  <p>{data?.averageRuntime}m</p>
                  <span className='flex items-center gap-2'>
                    <FaStar className='text-yellow-400' />{' '}
                    {data?.rating.average}
                    /10
                  </span>
                </div>
              </article>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
